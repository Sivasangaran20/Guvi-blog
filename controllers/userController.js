const User = require("../models/users");
const blogModel = require("../models/blogs");
const { generateTokenForUser } = require("../utils/auth");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName) throw new Error("Full Name is required");
    if (!email) throw new Error("email is required");
    if (typeof password !== "string" || password.length < 8) {
      throw new Error(
        "Password is required and must be at least 8 characters long"
      );
    }

    const isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.json({ message: "already exist" });
    }

    const userSchema = new User();

    await userSchema.setPassword(password);

    const user = await User.create(req.body);
    const token = await generateTokenForUser(user._id);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signup", { error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("email and password is required");

    const data = await User.findOne({ email: email });
    console.log(data);

    if (!data) {
      throw new Error(`user does not exists ${email}`);
    }

    if (data.password !== password) {
      throw new Error(`invalid password`);
    }

    const token = await generateTokenForUser(data._id);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", { error });
  }
};

const logout = async (req, res) => {
  return res.clearCookie("token").redirect("/");
};

const deleteOne = async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  return res.json({ message: "deleted" });
};

const loginPage = async (req, res) => {
  if (req.user) return res.redirect("/");
  return await res.render("login");
};

const signupPage = async (req, res) => {
  if (req.user) return res.redirect("/");
  return await res.render("signup");
};

module.exports = {
  register,
  login,
  logout,
  deleteOne,
  loginPage,
  signupPage,
};
