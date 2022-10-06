const bcrypt = require("bcrypt");
const User = require("../model/User");

module.exports = {
  async create(req, res, next) {
    const { name, email, password, age, admin } = req.body;

    let user = await User.findOne({ "email": email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env._PASSWORD_SALT));

      const new_user = new User({
        name,
        email,
        password: hashedPassword,
        age,
        likes: 0,
        p_language: null,
        createdAt: Date.now(),
        admin: Boolean(admin)
      });

      try {
        new_user.save((err, user) => {
          if (err) return res.json({ error: "An error ocurred" });
          res.json({ status: "created", user_id: user._id });
        });
      } catch (error) {
        res.json({ error: "An error ocurred" });
      }

    } else { res.json({ error: "Account already exists" }) }
  }
}