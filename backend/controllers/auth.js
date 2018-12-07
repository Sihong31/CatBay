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
        password: hashedPassword,
        cats: [],
        favoriteCats: []
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
  const email = req.body.email;
  const password = req.body.password;

  let fetchedUser;

  User.findOne({email: email})
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 401;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqualPassword => {
      if (!isEqualPassword) {
        const error = new Error('Invalid password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id.toString()
      }, process.env.JWT_KEY, {expiresIn: '1h'});
      res.status(200).json({
        message: 'User logged in!',
        token: token,
        userId: fetchedUser._id.toString(),
        expiresIn: 3600 * 1000
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    });
};

exports.fetchUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'User fetched!',
        userData: user
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        throw(err);
      }
    })
}
