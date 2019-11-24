
const router = require('express').Router()
const { ObjectId } = require('mongodb');
const dbPromise = require('../dbConnection');
const { validateTemplate } = require('../validators');

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.collection('templates').aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'questionIds',
          foreignField: '_id',
          as: 'questions'
        }
      }
    ]).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const template = req.body;
    if (!validateTemplate(template)) throw 'Invalid template data';
    template.questionIds = template.questionIds.map(id => ObjectId(id));
    const db = await dbPromise;
    const result = await db.collection('templates').insertOne(template);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

router.get('/:templateId', async (req, res) => {
  const _id = ObjectId(req.params.templateId);
  try {
    const db = await dbPromise;
    const result = await db.collection('templates').aggregate([
      {
        $match: { _id }
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questionIds',
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

router.delete('/:templateId', async (req, res) => {
  const _id = ObjectId(req.params.templateId);
  try {
    const db = await dbPromise;
    const result = await db.collection('templates').deleteOne({ _id });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error });
  }
});

module.exports = router;
