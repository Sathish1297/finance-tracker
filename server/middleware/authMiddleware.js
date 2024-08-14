const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    return res.status(401).json({ error: 'Token format invalid' });
  }

  jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};
