const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

let dbPromise = new Promise((resolve, reject) => {
  try {
    MongoClient.connect(url, (err, client) => {
      if (err) reject(err);
      resolve(client.db('open-evaluation'));
    });
  } catch (err) {
    reject(err);
  }
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  next();
});

app.get('/user', async (req, res) => {
  try {
    // Basic info
    let TOKEN = req.query.access_token;
    let raw = await fetch(`
      https://gatech.instructure.com/api/v1/users/self`,
      { headers: { 'Authorization': 'Bearer ' + TOKEN } }
    );
    let text = await raw.text();
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    const { id, name } = data;
    
    // Determine user role
    raw = await fetch(
      `https://gatech.instructure.com/api/v1/users/self/enrollments`,
      { headers: { 'Authorization': 'Bearer ' + TOKEN } }
    );
    text = await raw.text();
    data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    let studentEnrollmentCount = 0;
    for (let enrollment of data) {
      if (enrollment.type === 'StudentEnrollment') {
        studentEnrollmentCount++;
      }
    }
    const role = studentEnrollmentCount > data.length / 2 ? 'student' : 'professor';

    res.send({ id, name, role });
  } catch (error) {
    res.status(500);
    res.send({ error });  
  }
});


app.get('/courses', async (req, res) => {
  const TOKEN = req.query.access_token;
  let raw = await fetch(
    `https://gatech.instructure.com/api/v1/courses?enrollment_type=student&enrollment_state=active`,
    { headers: { 'Authorization': 'Bearer ' + TOKEN } }
  );
  let text = await raw.text();
  try {
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    res.send(data.map(({ id, name }) => ({
      courseId: id, courseName: name,
    })));
  } catch (error) {
    res.status(500);
    res.send({ error });
  }
});

// app.get('/surveys', async (req, res) => {
//   const db = await dbPromise;
//   db.collection('surveys').find({}).toArray((err, items) => {
//     if (err) {
//       res.status(500);
//       res.send({ error });
//     } else {
//       res.send(items)
//     }
//   })
// });

app.get('/surveys/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  const db = await dbPromise;
  try {
    const result = await db.collection('surveys').findOne({ _id: courseId })
    if (!result) {
      res.send([]);
    } else {
      res.send(result.surveys);
    }
  } catch (error) {
    res.status(500);
    res.send({ error });
  }  
});

app.post('/surveys/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  const { name, template } = req.body;
  const db = await dbPromise;
  try {
    const result = await db.collection('surveys').findOne({ _id: courseId });
    if (!result) {
      await db.collection('surveys').insertOne({
        _id: courseId,
        surveys: [{
            surveyId: courseId * 100 + 1,
            name,
            template,
            active: true
        }]
      });
    } else if (result.surveys.length === 0) {
      await db.collection('surveys').updateOne(
        { _id: courseId },
        {
          $set: {
            surveys: [{
              surveyId: courseId * 100 + 1,
              name,
              template,
              active: true
          }]
          }
        }
      );
    } else {
      const surveys = result.surveys;
      const surveyId = Math.max(...surveys.map(s => s.surveyId)) + 1;
      surveys.push({ surveyId, name, template, active: true });
      await db.collection('surveys').updateOne(
        { _id: courseId },
        { $set: { surveys } }
      );
    }
    res.status(200);
    res.send();
  } catch (error) {
    res.status(500);
    res.send({ error })
  }
});

app.get('/surveys/:courseId/:surveyId', async (req, res) => {
  const courseId = +req.params.courseId;
  const surveyId = +req.params.surveyId;
  const db = await dbPromise;
  db.collection('surveys').findOne({ _id: courseId })
    .then(({ surveys }) => {
      const result = surveys.find(s => s.surveyId === surveyId);
      res.send(result);
    }, error => {
      res.status(500);
      res.send({ error });
    });
});

app.delete('/surveys/:courseId/:surveyId', async (req, res) => {
  const courseId = +req.params.courseId;
  const surveyId = +req.params.surveyId;
  const db = await dbPromise;
  const { surveys } = await db.collection('surveys').findOne({ _id: courseId });
  await db.collection('surveys').updateOne(
    { _id: courseId },
    { $set: { surveys: surveys.filter(s => s.surveyId !== surveyId)}}
  );
  res.send();
});


app.get('/response', async (req, res) => {
  const courseId = +req.query.courseId;
  const surveyId = +req.query.surveyId;
  const studentId = +req.query.studentId;
  const db = await dbPromise;
  const col = db.collection('responses');
  const result = await col.findOne({
    _id : { courseId, surveyId, studentId }
  }, { responses: true });
  res.send(result ? result.responses : []);
})

app.post('/response', async (req, res) => {
  const { _id, responses } = req.body;
  const db = await dbPromise;
  const col = db.collection('responses');
  let result = await col.update({ _id }, { responses }, { upsert: true });
  res.send(result);
});

app.listen(4201, () => console.log('listening on 4201'));
