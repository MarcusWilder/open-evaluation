const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { getCookie } = require('./get-cookie');
const COOKIE_NAME = 'canvas_session';


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

/****** CORE API ********/

app.use('/questions', require('./routes/questions'));
app.use('/surveys', require('./routes/surveys'));
app.use('/templates', require('./routes/templates'));

/****** END OF CORE API ********/

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

app.listen(4201, () => console.log('listening on 4201'));
