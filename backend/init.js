const { MongoClient } = require('mongodb');
const questions = require('./schemas/questions');

const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

MongoClient.connect(url, async (err, client) => {
  if (err) return;
  const db = client.db('open-evaluation');
  let data = Array(10).fill(0).flatMap((_, courseId) => {
    courseId += 20000;
    return Object.keys(questions).map((type, i) => {
        return {
          _id: courseId * 100 + i,
          courseId,
          name: `${type} Survey`,
          template: type,
          active: Math.random() > Math.random(),
          responses: questions[type].map(() => []) // One array of responses for each questions
        };
      });
  });
  await db.collection('surveys').deleteMany(); 
  await db.collection('surveys').insertMany(data);
  console.log('done');
  client.close();
});
