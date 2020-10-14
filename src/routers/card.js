const express = require('express');
const { Card } = require('../models/card');
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

router.delete('/cards', async (req, res) => {
  const id = req.query.id;
  try {
    let collection = await Collection.findOne({
      title: req.query.collectionTitle,
    });
    collection.cards = collection.cards.filter((card) => {
      return card._id.toString() !== req.query.id;
    });
    collection.save();
    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
