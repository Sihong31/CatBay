const jwt = require('jsonwebtoken');

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
