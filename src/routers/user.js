const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
  const userCheck = await User.findOne({ name: req.body.name });
  if (userCheck) {
    return res.status(409).send();
  }

  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.name, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/users/name', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send({ user });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
