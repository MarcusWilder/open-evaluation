const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Ajv = require('ajv');
const ajv = new Ajv();
const validateSurveyUpdate = ajv.compile(require('./schemas/survey-update-schema.json'));
const validateResponse = ajv.compile(require('./schemas/survey-response-schema.json'));
const { getCookie } = require('./get-cookie');
const questions = require('./schemas/questions');

const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

const COOKIE_NAME = 'canvas_session';

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
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/cookie', async (req, res) => {
  const { username, password } = req.query;
  try {
    const cookie = await getCookie(username, password);
    res.send(cookie);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });  
  }
});

app.get('/user', async (req, res) => {
  try {
    // Basic info
    // let TOKEN = req.query.access_token;
    const cookie = req.query.cookie;
    let raw = await fetch(
      `https://gatech.instructure.com/api/v1/users/self`,
      // { headers: { 'Authorization': 'Bearer ' + TOKEN } }
      { headers: { 'Cookie': COOKIE_NAME + '=' + cookie } }
    );
    let text = await raw.text();
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    const { id, name } = data;
    
    // Determine user role
    raw = await fetch(
      `https://gatech.instructure.com/api/v1/users/self/enrollments`,
      // { headers: { 'Authorization': 'Bearer ' + TOKEN } }
      { headers: { 'Cookie': COOKIE_NAME + '=' + cookie } }
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
    console.log(error);
    res.status(500);
    res.send({ error });  
  }
});


app.get('/courses', async (req, res) => {
  // const TOKEN = req.query.access_token;
  const cookie = req.query.cookie;
  let raw = await fetch(
    `https://gatech.instructure.com/api/v1/courses?enrollment_type=student&enrollment_state=active`,
    // { headers: { 'Authorization': 'Bearer ' + TOKEN } }
    { headers: { 'Cookie': COOKIE_NAME + '=' + cookie } }
  );
  let text = await raw.text();
  try {
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    res.send(data.map(({ id, name }) => ({
      courseId: id, courseName: name,
    })));
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

app.get('/question-templates', (req, res) => {
  res.send(questions);
})

/*************************************** SURVEYS ********************************************/

app.get('/surveys/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  const db = await dbPromise;
  try {
    const surveys = await db.collection('surveys').find({ courseId }).toArray();
    res.send(surveys);
 } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }  
});

app.post('/surveys/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  try {
    if (!validateSurveyUpdate(req.body)) {
      throw 'Invalid POST data!';
    }
    const { name, template, active } = req.body;
    const db = await dbPromise;
    const surveys = await db.collection('surveys').find({ courseId }).toArray();
    let _id;
    if (surveys.length === 0) {
      _id = courseId * 100;
    } else {
      _id = Math.max(...surveys.map(s => s._id)) + 1; 
    }
    await db.collection('surveys').insertOne({
      _id,
      courseId,
      name,
      template,
      questionIds: questions[template].map(q => q._id),
      active,
    });
    res.status(200);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error })
  }
});

app.get('/surveys/:courseId/:surveyId', async (req, res) => {
  const _id = +req.params.surveyId;
  const db = await dbPromise;
  try {
    let survey = await db.collection('surveys').findOne({ _id });
    if (survey) {
      survey.questions = await db.collection('questions').find({
        _id: { $in: survey.questionIds }
      }).toArray();
    }
    res.send(survey);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

app.put('/surveys/:courseId/:surveyId', async (req, res) => {
  const _id = +req.params.surveyId;
  try {
    if (!validateSurveyUpdate(req.body)) {
      throw 'Invalid POST data!';
    }
    const { name, template, active } = req.body;
    const db = await dbPromise;
    const survey = await db.collection('surveys').findOne({ _id });
    await db.collection('surveys').updateOne(
      { _id },
      {
        $set: {
          name,
          template,
          questionIds: questions[template].map(q => q._id),
          active,
        }
      }
    )
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

app.delete('/surveys/:courseId/:surveyId', async (req, res) => {
  const _id = +req.params.surveyId;
  const db = await dbPromise;
  try {
    await db.collection('surveys').deleteOne({ _id });
    res.send();
  } catch (error) {
    res.status(500);
    res.send({ error });
  }
});

app.get('/surveys/:courseId/:surveyId/responses', async (req, res) => {
  const surveyId = +req.params.surveyId
  const db = await dbPromise;
  try {
    let result = await db.collection('responses').find({ surveyId }).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

app.post('/surveys/:courseId/:surveyId/responses', async (req, res) => {
  const surveyId = +req.params.surveyId
  const db = await dbPromise;
  try {
    const { template }= await db.collection('surveys').findOne({ _id: surveyId });
    const responseRecord = {
      surveyId,
      template,
      responses: req.body
    }
    if (!validateResponse(responseRecord)) {
      console.log(responseRecord);
      throw Error('Data format invalid');
    }
    let result = await db.collection('responses').insertOne(responseRecord);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

app.listen(4201, () => console.log('listening on 4201'));
