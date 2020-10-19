const express = require('express');
const Collection = require('../models/collection');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/collections', async (req, res) => {
  const userID = req.body.userID;
  const collection = new Collection({
    title: req.body.title,
    userID,
    cards: [],
  });

  try {
    await collection.save();
    const collections = await Collection.find({ userID });
    res.status(201).send({ collections });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/collections', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ userID: req.user._id });
    res.send({ collections });
  } catch (error) {
    res.status(500).send();
  }
});

router.delete('/collections', async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.query.id);
    const collections = await Collection.find({});
    res.status(200).send({ collections });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
