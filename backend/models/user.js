const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cats: [{
    type: Schema.Types.ObjectId,
    ref: 'Cat'
  }],
  favoriteCats: [{
    type: Schema.Types.ObjectId,
    ref: 'Cat'
  }],
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Cat'
  }]
});

module.exports = mongoose.model('User', userSchema);
