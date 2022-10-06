const User = require("../model/User");

module.exports = {
  async list(req, res, next) {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  }
}