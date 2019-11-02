const { MongoClient } = require('mongodb');
const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';
MongoClient.connect(url, async (err, client) => {
  if (err) return;
  const db = client.db('open-evaluation');
  let data = Array(100000).fill(0).map((e, i) => {
    return {
      "courseId": i,
      "surveys": [
        {
          "surveyId": i * 100 + 1,
          "name": "Survey 1",
          "template": "DEFAULT",
          "active": Math.random() > 0.5
        },
        {
          "surveyId": i * 100 + 2,
          "name": "Survey 2",
          "template": "CTL",
          "active": Math.random() > 0.5
        }
      ]
    }
  });
  // await db.collection('surveys').deleteMany(); 
  await db.collection('surveys').insertMany(data);
  console.log('done');
  client.close();
});
