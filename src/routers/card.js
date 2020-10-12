const express = require('express');
const Card = require('../models/card');
const router = new express.Router();

router.post('/cards', async (req, res) => {
  const card = new Card({
    ...req.body,
  });

  try {
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
