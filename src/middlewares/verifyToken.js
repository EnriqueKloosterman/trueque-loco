const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
