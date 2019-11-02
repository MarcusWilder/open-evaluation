const fetch = require('node-fetch');
const express = require('express');
const app = express();
const TOKEN = '2096~qSLzU7BxpYDDiPppntkyBADaMxUl9Rjrtc8g6pKrhIeOcTf6intMwZJHv6vTp7YY';

app.get('/user', async (req, res) => {
  let raw = await fetch(`
    https://gatech.instructure.com/api/v1/users/self`,
    { headers: { 'Authorization': 'Bearer ' + TOKEN } }
  );
  let text = await raw.text();
  try {
    let data = JSON.parse(text.slice(text.indexOf(';') + 1));
    if (data.errors) throw data.errors;
    const { id, name } = data;
    res.send({ id, name });
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
