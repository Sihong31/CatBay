const Cat = require('../models/cat');
const User = require('../models/user');

// save the cat favorited by a user
exports.createFavorite = (req, res, next) => {
  const catId = req.body.catId;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      user.favoriteCats.push(catId);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Favorite created!'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

// remove the cat favorited by the user
exports.removeFavorite = (req, res, next) => {
  const catId = req.body.catId;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      user.favoriteCats.pull(catId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Favorite removed!'
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.getCats = (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
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
  } else {
    let fetchedCats;
    Cat.find()
    .then(cats => {
      fetchedCats = cats;
      return User.findById(userId)
    })
    // after fetching all the cats, match them against cats that are already in User's cart and remove them from all cats list
    .then(user => {
      let updatedCats = [];
      fetchedCats.forEach((cat, index) => {
        if (!(user.cart.indexOf(fetchedCats[index]._id) > -1)) {
          updatedCats.push(cat);
        }
      })
      res.status(200).json({ message: 'Cats fetched', cats: updatedCats});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }
}

exports.createCat = (req, res, next) => {
  const cat = new Cat({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    weight: req.body.weight,
    price: req.body.price,
    imagePath: req.body.imagePath,
    owner: req.body.owner,
    available: req.body.available
  });
  cat.save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
      }
      user.cats.push(cat);
      return user.save();
    })
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
      }
      next(err);
    })
}

exports.deleteCat = (req, res, next) => {
  const catId = req.params.catId;
  Cat.findById(catId)
    .then(cat => {
      if (!cat) {
        const error = new Error('Cat not found!');
        error.statusCode(404);
        throw error;
      }
      if (cat.owner.toString() !== req.userId) {
        const error = new Error('Not authorized');
        error.statusCode(403);
        throw error;
      }
      return Cat.findByIdAndDelete(catId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.cats.pull(catId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Cat deleted!'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}
