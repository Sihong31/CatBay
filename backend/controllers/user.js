const User = require('../models/user');
const Cat = require('../models/cat');

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .populate('favoriteCats')
    .select('-password')
    .populate('cats')
    .populate('cart')
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


// add cat to user cart
exports.addToCart = (req, res, next) => {
  const userId = req.params.userId;
  const cat = req.body.cat;
  User.findById(userId)
    .populate('cart')
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      // check to see if cat is already in cart
      user.cart.forEach(cartCat => {
        if (cartCat._id.toString() === cat._id) {
          const error = new Error('Cat already exists in cart!');
          error.statusCode = 304;
          throw error;
        }
      })
      fetchedCats = user.cats;
      cat.available = 'false';
      user.cart.push(cat);
      return user.save();
    })
    .then(result => {
      console.log(result);
      return res.status(200).json({
        message: 'added to cart!',
        cart: result.cart
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

// remove cat from user cart
exports.removeFromCart = (req, res, next) => {
  const userId = req.params.userId;
  const catId = req.body.catId;
  let fetchedUser;

  User.findById(userId)
    .populate('cart')
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      if (user._id.toString() !== req.userId) {
        const error = new Error('User not authorized!');
        error.statusCode = 403;
        throw error;
      }
      fetchedUser = user;
      return Cat.findById(catId);
    })
    .then(cat => {
      if (!cat) {
        const error = new Error('Cat not found!');
        error.statusCode = 404;
        throw error;
      }
      cat.available = true;
      fetchedUser.cart.pull(catId);
      return fetchedUser.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Removed from cart!',
        cart: result.cart
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}
