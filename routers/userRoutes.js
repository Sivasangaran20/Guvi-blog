const express = require("express");
const {
  register,
  login,
  logout,
  deleteOne,
  loginPage,
  signupPage,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.delete("/:id", deleteOne);

userRouter.get("/login", loginPage);

userRouter.get("/signup", signupPage);

module.exports = userRouter;
