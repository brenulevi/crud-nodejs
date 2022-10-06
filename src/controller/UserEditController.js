const User = require("../model/User");

module.exports = {
  async edit(req, res, next) {
    const { name, email, age, p_language } = req.body;
    const { user_id } = req;
    const user = await User.findByIdAndUpdate(user_id, {
      name: name,
      email: email,
      age: age,
      p_language: p_language
    }, {
      new: true
    })
    if (user) { return res.json({ status: "updated", user }) }
    res.json({ error: "An error ocurred" });
  }
}