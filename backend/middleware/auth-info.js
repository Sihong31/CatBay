const jwt = require('jsonwebtoken');

// handle info to show on pages where both logged in and not logged in users can access
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  let decodedToken = { userId: ''};
  if (token !== 'undefined' && token !== 'null') {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  }
  req.userId = decodedToken.userId;
  next();
}
