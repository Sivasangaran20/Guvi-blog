const { validateToken } = require("../utils/auth");

exports.checkToken = function (req, res, next) {
  const token = req.cookies["token"];
  try {
    if (!token) {
      return res.redirect("/users/login");
    }
    const userPayload = validateToken(token);
    req.user = userPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.checkAbility = function (role) {
  return function (req, res, next) {
    const token = req.cookies["token"];
    if (!token) return res.redirect("/");
    try {
      const userPayload = validateToken(token);
      if (userPayload.role === role) {
        req.user = userPayload;
        next();
      } else {
        return res.redirect("/");
      }
    } catch (error) {
      return res.redirect("/");
    }
  };
};

exports.ensureAuthenticated = function (req, res, next) {
  if (!req.user) return res.redirect("/login");
  next();
};
