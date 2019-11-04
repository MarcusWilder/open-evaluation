const { MongoClient } = require('mongodb');
const url = 'mongodb://openeval:admin2019@ds141248.mlab.com:41248/open-evaluation';
MongoClient.connect(url, async (err, client) => {
  if (err) return;
  const db = client.db('open-evaluation');
  let data = Array(100000).fill(0).map((_, courseId) => {
    const surveys = ['DEFAULT','CTL','CIOS','GENERAL','LAB_PROBLEM_SOLVE','DISCUSSION','TEAM']
      .map((type, i) => {
        return {
          surveyId: courseId * 100 + i,
          name: `${type} Survey`,
          template: type,
          active: Math.random() > Math.random()
        };
      });
    return { _id: courseId, surveys }
  });
  // await db.collection('surveys').deleteMany(); 
  await db.collection('surveys').insertMany(data);
  console.log('done');
  client.close();
});
