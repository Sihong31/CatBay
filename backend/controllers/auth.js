const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'User signed up!',
        userId: result._id
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
}

exports.login = (req, res, next) => {

}
