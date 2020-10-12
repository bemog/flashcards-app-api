const mongoose = require('mongoose');

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
  cards: [],
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
