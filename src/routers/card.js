const express = require('express');
const Card = require('../models/card');
const Collection = require('../models/collection');
const router = new express.Router();

router.post('/cards', async (req, res) => {
  const collection = await Collection.findOne({
    userID: req.body.userID,
    title: req.body.title,
  });

  const card = new Card({
    question: req.body.question,
    answer: req.body.answer,
  });

  try {
    await collection.cards.push(card);
    await collection.save();
    res.status(201).send({ card });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
