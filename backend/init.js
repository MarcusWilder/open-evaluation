const { MongoClient } = require('mongodb');
const questionsTemplates = require('./schemas/questions');

const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

MongoClient.connect(url, async (err, client) => {
  if (err) return;
  const db = client.db('open-evaluation');

  let questions = Object.values(questionsTemplates).flatMap(i => i);
  await db.collection('questions').deleteMany(); 
  await db.collection('questions').insertMany(questions);

  let surveys = Array(10).fill(0).flatMap((_, courseId) => {
    courseId += 20000;
    return Object.keys(questionsTemplates).map((type, i) => {
        return {
          _id: courseId * 100 + i,
          courseId,
          name: `${type} Survey`,
          template: type,
          questionIds: questionsTemplates[type].map(question => question._id),
          active: Math.random() > Math.random(),
        };
      });
  });
  await db.collection('surveys').deleteMany(); 
  await db.collection('surveys').insertMany(surveys);

  console.log('done');
  client.close();
});
