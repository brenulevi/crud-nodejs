const User = require("../model/User");

module.exports = {
  async delete(req, res, next) {
    const { user_id } = req;
    const user = await User.findByIdAndDelete(user_id);
    if (user) { return res.json({ status: "deleted", user }) }
    res.json({ error: "An error ocurred" });
  }
}