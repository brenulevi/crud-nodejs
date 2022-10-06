const express = require("express");

const router = express.Router();

const middlewares = require("./middleware/Middlewares")

const UserCreateController = require("./controller/UserCreateController");
const UserLoginController = require("./controller/UserLoginController");
const UserProfileController = require("./controller/UserProfileController");
const UserEditController = require("./controller/UserEditController");
const UserDeleteController = require("./controller/UserDeleteController");
const { verifyAdmin } = require("./middleware/Middlewares");

//#region User
// Create User
router.post("/create", UserCreateController.create);

// Login User
router.post("/login", UserLoginController.login);

// Get User
router.get("/:id/profile", middlewares.verifyToken, UserProfileController.list);

// Edit User
router.put("/edit", middlewares.verifyToken, UserEditController.edit);

// Delete User
router.delete("/delete", middlewares.verifyToken, UserDeleteController.delete);

//#endregion

const User = require("./model/User");

router.get("/users/all", verifyAdmin, async (req, res, next) => {
    const users = await User.find();
    res.json({status: "success", users});
})



module.exports = router;