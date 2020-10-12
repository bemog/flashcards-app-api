const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const userRouter = require('./routers/user');
const collectionRouter = require('./routers/collection');
const cardRouter = require('./routers/card');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(collectionRouter);
app.use(cardRouter);

module.exports = app;
