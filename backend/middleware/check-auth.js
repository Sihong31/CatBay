const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  const token = authHeader.split(' ')[1];
  if (token === 'null') {
    const error = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
}
