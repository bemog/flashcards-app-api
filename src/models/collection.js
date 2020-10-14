const mongoose = require('mongoose');
const { cardSchema } = require('../models/card');

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  userID: {
    type: String,
    trim: true,
    required: true,
  },
  cards: [cardSchema],
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
