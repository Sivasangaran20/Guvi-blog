const blogModel = require("../models/blogs");

const home = async (req, res) => {
  const allBlogs = await blogModel.find({}).sort({ createdAt: -1 });
  return await res.render("home", { user: req.user, blogs: allBlogs });
};

module.exports = { home };
