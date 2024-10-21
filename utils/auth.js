const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

exports.generateTokenForUser = async (userId) => {
  const user = await userModel.findById(userId);
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SCRET, { expiresIn: "1h" });
  return token;
};

exports.validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SCRET, { ignoreExpiration: false });
};
