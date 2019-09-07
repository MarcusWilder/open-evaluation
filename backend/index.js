const request = require('request');
const express = require('express');
const { parseString: parseXML } = require('xml2js');
const { getUserInfoById } = require('./user');

const CALLBACK_URL = `http://openeval.gatech.edu:4200/home`;
const app = express();

app.get('/validate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://openeval.gatech.edu:4200');
  let ticket = req.query.ticket;
  let validation_url = `https://login.gatech.edu/serviceValidate?service=${
    encodeURIComponent(CALLBACK_URL)
  }&ticket=${ticket}`;

  request(validation_url, (err, response, body) => {
    parseXML(body, (err, result) => {
      if (err) {
        res.send({ loggedIn: false, reason: err });
        return;
      }
      if (result['cas:serviceResponse']['cas:authenticationSuccess']) {
        let username = result['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
        getUserInfoById(username).then(data => {
          res.send({ loggedIn: true, info: data[0] });
        }, (reason) => {
          res.send({ loggedIn: false, reason });
        })

      } else {
        res.send({ loggedIn: false, reason: '?' });
      }
    });
  });
});

app.listen(4201, () => console.log(`Listening on port 4201`));
