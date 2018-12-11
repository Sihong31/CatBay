const express = require('express');
const bodyParser = require('body-parser');

const catRoutes = require('./routes/cat');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/cats', catRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({ message: message, data: data });
});

module.exports = app;
