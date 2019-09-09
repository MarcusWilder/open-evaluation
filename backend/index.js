const request = require('request');
const express = require('express');
var cookieParser = require('cookie-parser');
const uniqueString = require('unique-string');
const { parseString: parseXML } = require('xml2js');
const { getUserInfoById } = require('./user');

const CALLBACK_URL = `http://openeval.gatech.edu:4200/dashboard`;
const app = express();
const sessions = new Map();

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://openeval.gatech.edu:4200');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  // console.log('Cookies:', req.cookies);
  next();
});

app.get('/validate', (req, res) => {
  let ticket = req.query.ticket;
  if (!ticket) {
    res.send({ loggedIn: false, reason: 'No Ticket' });
    return;
  }
  let validation_url = `https://login.gatech.edu/serviceValidate?service=${
    encodeURIComponent(CALLBACK_URL)
  }&ticket=${ticket}`;

  request(validation_url, (err, response, body) => {
    parseXML(body, (err, result) => {
      if (err) {
        res.send({ loggedIn: false, reason: err });
        return;
      }
      if (sessions.has(req.cookies.SESSION)) {
        let username = sessions.get(req.cookies.SESSION);
        getUserInfoById(username).then(data => {
          res.send({ loggedIn: true, info: data[0] });
        }, (reason) => {
          res.send({ loggedIn: false, reason });
        });
        return;
      }
      if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
        let username = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
        const session = uniqueString();
        sessions.set(session, username);
        res.cookie('SESSION', session);
        getUserInfoById(username).then(data => {
          res.send({ loggedIn: true, info: data[0] });
        }, (reason) => {
          res.send({ loggedIn: false, reason });
        });
        return;
      }
      res.send({ loggedIn: false, reason: result });
    });
  });
});

app.get('/logout', (req, res) => {
  let session = req.cookies.SESSION;
  if (sessions.has(session)) {
    sessions.delete(session);
  }
  res.send();
})

app.listen(4201, () => console.log(`Listening on port 4201`));
