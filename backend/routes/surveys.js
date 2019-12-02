const router = require('express').Router()
const { ObjectId } = require('mongodb');
const dbPromise = require('../dbConnection');
const { validateResponse, validateSurveyUpdate } = require('../validators');
const hash = require('hash.js');

router.get('/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  const hashedUserId = hash.sha256().update(+req.query.userId).digest('hex');
  const db = await dbPromise;
  try {
    const surveys = await db.collection('surveys').find({ courseId }).toArray();
    for (let s of surveys) {
      s.completed = !!await db.collection('responses').findOne({
        surveyId: s._id,
        hashedUserId
      })
    }
    res.send(surveys);
  } catch (error) {
    console.log(errror);
    res.status(500);
    res.send({ error });
  }  
});

router.post('/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  try {
    if (!validateSurveyUpdate(req.body)) {
      throw 'Invalid POST data!';
    }
    const { name, template, active } = req.body;
    const db = await dbPromise;
    const result = await db.collection('surveys').insertOne({
      courseId,
      name,
      template,
      active,
    });
    res.status(200);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error })
  }
});

router.get('/:courseId/:surveyId', async (req, res) => {
  const _id = ObjectId(req.params.surveyId);
  const db = await dbPromise;
  try {
    let result = await db.collection('surveys').aggregate([
        {
            $match: { _id }
        },
        {
            $lookup: {
                from: 'templates',
                localField: 'template',
                foreignField: 'type',
                as: '_template'
            }
        },
        {
            $lookup: {
                from: 'questions',
                localField: '_template.questionIds',
                foreignField: '_id',
                as: 'questions'
            }
        }
    ]).toArray();
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
}); 

router.put('/:courseId/:surveyId', async (req, res) => {
  const _id = ObjectId(req.params.surveyId);
  try {
    // if (!validateSurveyUpdate(req.body)) {
    //   throw 'Invalid POST data!';
    // }
    // const { name, template, active } = req.body;
    const db = await dbPromise;
    const result = await db.collection('surveys').updateOne(
      { _id },
      {
        $set: req.body
      }
    )
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.delete('/:courseId/:surveyId', async (req, res) => {
  const _id = ObjectId(req.params.surveyId);
  const db = await dbPromise;
  try {
    const result = await db.collection('surveys').deleteOne({ _id });
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send({ error });
  }
});

router.post('/:courseId/:surveyId/responses', async (req, res) => {
  const surveyId = ObjectId(req.params.surveyId);
  try {
    const db = await dbPromise;
    const { template } = await db.collection('surveys').findOne({ _id: surveyId });
    const hashedUserId = req.body.hashedUserId;
    const responses = req.body.responses.map(response => ({
        ...response,
        questionId: ObjectId(response.questionId)
    }))
    const responseRecord = {
      surveyId,
      hashedUserId,
      template,
      responses 
    }
    if (!validateResponse(responseRecord)) {
      console.log(responseRecord);
      throw 'Data format invalid';
    }
    let result = await db.collection('responses').insertOne(responseRecord);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.get('/:courseId/:surveyId/responses', async (req, res) => {
  const _id = ObjectId(req.params.surveyId);
  try {
    const db = await dbPromise;
    let result = await db.collection('surveys').aggregate([
        {
            $match: { _id }
        },
        {
            $lookup: {
                from: 'templates',
                localField: 'template',
                foreignField: 'type',
                as: '_template'
            }
        },
        {
            $lookup: {
                from: 'questions',
                localField: '_template.questionIds',
                foreignField: '_id',
                as: 'questions'
            }
        }
    ]).toArray();
    let survey = result[0];
    for (let [i, question] of survey.questions.entries()) {
      if (question.type === 'FREE_RESPONSE') {
        let responses = (await db.collection('responses').aggregate([
          { $match: { surveyId: _id } },
          { $project: { response: { $arrayElemAt: [ "$responses", i ] } } },
        ]).toArray()).map(o => o.response.studentResponse);
        question.responses = responses;
        continue;
      }
      let counter = (survey.questions[i].options || [0,1,2,3,4,5]).map(_ => 0);
      let responses = await db.collection('responses').aggregate([
        { $match: { surveyId: _id } },
        { $project: { response: { $arrayElemAt: [ "$responses", i ] } } },
        {
          $group: {
            _id: `$response.studentResponse`,
            count: { $sum: 1 }
          }
        },
      ]).toArray()
      for (let { _id: option, count } of responses) {
        counter[option] = count;
      }
      question.responses = counter;
    }
    res.send(survey);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});


module.exports = router;
