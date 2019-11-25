const router = require('express').Router()
const { ObjectId } = require('mongodb');
const dbPromise = require('../dbConnection');
const { validateQuestion } = require('../validators');

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.collection('questions').find({}).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.get('/:questionId', async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const db = await dbPromise;
    const result = await db.collection('questions').findOne({
        _id: ObjectId(questionId)
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.delete('/:questionId', async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const db = await dbPromise;
    const result = await db.collection('questions').deleteOne({
        _id: ObjectId(questionId)
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const question = req.body;
    if (question._id) {
        question._id = ObjectId(question._id)
    }
    if (!validateQuestion(question)) throw 'Invalid question data';
    const db = await dbPromise;
    const result = await db.collection('questions').insertOne(question);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

module.exports = router;
