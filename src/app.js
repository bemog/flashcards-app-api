const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routers/user');
const collectionRouter = require('./routers/collection');
const cardRouter = require('./routers/card');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(collectionRouter);
app.use(cardRouter);

module.exports = app;
