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

exports.createCat = (req, res, next) => {

}

exports.getCat = (req, res, next) => {
  const catId = req.params.catId;
  Cat.findById(catId)
    .then(cat => {
      if(!cat) {
        const error = new Error('Could not find cat!');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Cat fetched', cat: cat });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.updateCat = (req, res, next) => {

}

exports.deleteCat = (req, res, next) => {

}
