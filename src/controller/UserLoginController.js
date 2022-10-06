const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");

module.exports = {
  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
      const id = user._id;
      const token = jwt.sign({ id }, process.env._DB_SECRET, {
        expiresIn: 300
      });
      return res.json({ auth: true, token: token, user: user });
    } else { res.status(404).json({ error: "User not found" }) }

  }
}