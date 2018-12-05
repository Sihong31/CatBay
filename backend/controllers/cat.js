const Cat = require('../models/cat');

exports.getCats = (req, res, next) => {
  Cat.find()
    .then(cats => {
      res.status(200).json({ message: 'Cats fetched', cats: cats});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
