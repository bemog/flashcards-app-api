const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const userCheck = await User.findOne({ name: req.body.name });
  if (userCheck) {
    return res.status(409).send();
  }

  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);
    res.send({ user });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
