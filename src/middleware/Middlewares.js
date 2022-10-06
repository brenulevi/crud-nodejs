const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: function (req, res, next) {
    const token = req.headers["access-token"];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, process.env._DB_SECRET, function (err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });

      req.user_id = decoded.id;
      next();
    })
  },
  verifyAdmin: function (req, res, next) {
    const token = req.headers["access-token"];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided' });

    jwt.verify(token, process.env._DB_SECRET, function (err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });

      if(decoded.admin == true) {
        req.admin = decoded.admin;
        next();
      } else {
        return res.status(401).json({ auth: false, message: 'You are not an admin' });
      }
    });
  }
}