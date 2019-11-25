
const { MongoClient } = require('mongodb');

const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

module.exports = new Promise((resolve, reject) => {
  try {
    MongoClient.connect(url, (err, client) => {
      if (err) reject(err);
      resolve(client.db('open-evaluation'));
    });
  } catch (err) {
    reject(err);
  }
});
