const router = require('express').Router()
const { ObjectId } = require('mongodb');
const dbPromise = require('../dbConnection');
const { validateResponse, validateSurveyUpdate } = require('../validators');
const crypto = require('crypto');

router.get('/:courseId', async (req, res) => {
  const courseId = +req.params.courseId;
  const db = await dbPromise;
  try {
    const surveys = await db.collection('surveys').find({ courseId }).toArray();
    res.send(surveys);
  } catch (error) {
    console.log(error);
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
    if (!validateSurveyUpdate(req.body)) {
      throw 'Invalid POST data!';
    }
    const { name, template, active } = req.body;
    // query for hash. if hashedId is in responses then set to inactive
    const db = await dbPromise;
    const result = await db.collection('surveys').updateOne(
      { _id },
      {
        $set: {
          name,
          template,
          active,
        }
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
    const hashedId = crypto.createHash('sha256').update(String(req.body.userId)).digest('hex');
    const responses = req.body.map(response => ({
        questionId: ObjectId(response.questionId),
        questionType: response.questionType,
        studentResponse: response.studentResponse
    }))
    const responseRecord = {
      surveyId,
      template,
      hashedId,
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
  const surveyId = ObjectId(req.params.surveyId);
  try {
    const db = await dbPromise;
    let result = await db.collection('responses').find({ surveyId }).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});


module.exports = router;
