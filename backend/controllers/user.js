const User = require('../models/user');

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .populate('favoriteCats')
    .select('-password')
    .populate('cats')
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
        next(err);
      } else {
        next(err);
      }
    })
}

exports.getCart = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .populate('cart')
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'cart fetched!',
        cart: user.cart
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.addToCart = (req, res, next) => {
  const userId = req.params.userId;
  const cat = req.body.cat;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      user.cart.push(cat);
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'added to cart!'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}
