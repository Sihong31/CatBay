require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = require('./app.js');

const PORT = process.env.PORT || 3000;

// mongodb connection
mongoose.connect(
    process.env.MONGODB_CONNECTION
  )
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  })

