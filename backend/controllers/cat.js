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
  const cat = new Cat({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    weight: req.body.weight,
    price: req.body.price,
    imagePath: req.body.imagePath
  });
  cat.save()
    .then(result => {
      res.status(201).json({
        message: 'Cat created',
        cat: cat
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
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
  const catId = req.params.catId;
  const updatedCat = req.body;
  Cat.findById(catId)
    .then(cat => {
      if (!cat) {
        const error = new Error('Cat not found');
        error.statusCode = 404;
        throw error;
      }
      cat.name = updatedCat.name;
      cat.description = updatedCat.description;
      cat.age = updatedCat.age;
      cat.weight = updatedCat.weight;
      cat.price = updatedCat.price;
      cat.imagePath = updatedCat.imagePath;
      return cat.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Cat updated!',
        cat: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
        next(err);
      }
    })
}

exports.deleteCat = (req, res, next) => {

}
