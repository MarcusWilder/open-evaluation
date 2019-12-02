const questionsTemplates = require('./schemas/questions');
const { MongoClient } = require('mongodb');
const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';

MongoClient.connect(url, async (err, client) => {
  if (err) return;
  const db = client.db('open-evaluation');

  await db.collection('questions').deleteMany();
  await db.collection('templates').deleteMany(); 

  Object.entries(questionsTemplates).forEach(async ([type, questions]) => {
    result = await db.collection('questions').insertMany(questions);
    await db.collection('templates').insertOne({
      type,
      questionIds: Object.values(result.insertedIds)
    });
  });

  let surveys = Object.keys(questionsTemplates).map((type, i) => {
    return {
      courseId: 30000,
      name: `${type} Survey`,
      template: type,
      // questionIds: questionsTemplates[type].map(question => question._id),
      active: Math.random() > Math.random(),
    };
  });
  await db.collection('surveys').deleteMany(); 
  await db.collection('surveys').insertMany(surveys);

  await db.collection('responses').deleteMany();
  console.log('done');
  client.close();
});
