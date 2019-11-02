const fetch = require('node-fetch');
const express = require('express');
const app = express();
const TOKEN = '2096~qSLzU7BxpYDDiPppntkyBADaMxUl9Rjrtc8g6pKrhIeOcTf6intMwZJHv6vTp7YY';

app.get('/user', async (req, res) => {
  try {
    // Basic info
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
  } catch (err) {
    res.send(err);  
  }
});


app.get('/courses', async (req, res) => {
  let raw = await fetch(
    `https://gatech.instructure.com/api/v1/courses?enrollment_type=student&enrollment_state=active`,
    { headers: { 'Authorization': 'Bearer ' + TOKEN } }
  );
  let text = await raw.text();
  try {
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    res.send(data.map(({ id, name }) => ({
      id, name,
    })));
  } catch (err) {
    res.send(err);
  }
});

app.listen(4201, () => console.log('listening on 4201'));
