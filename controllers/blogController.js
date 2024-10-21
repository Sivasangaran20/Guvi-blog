const blogModel = require("../models/blogs");
const Comment = require("../models/comments");

const create = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content)
      throw new Error("all fields are mandatory");
    await blogModel.create({
      title: req.body.title,
      content: req.body.content,
      coverImage: req.file.filename,
      createdBy: req.user._id,
    });
    return res
      .status(201)
      .render("blog", { message: "blog created successfully", user: req.user });
  } catch (error) {
    return res.render("blog", { error });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await blogModel
      .findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
      .populate("createdBy", ["email", "fullName"]);

    const comments = await Comment.find({ blog: data.id }).populate(
      "createdBy",
      ["email", "fullName"]
    );

    if (!data)
      return res.status(404).render("home", { message: "Not Found!!" });
    return res.render("getBlog", {
      blog: data,
      user: req.user,
      comments: comments,
    });
  } catch (error) {
    return res.redirect("/");
  }
};

const update = async (req, res) => {
  const data = await blogModel.findByIdAndUpdate(req.params.id, {
    bookName: req.body.bookName,
    bookCode: req.body.bookCode,
    authorName: req.body.authorName,
    price: req.body.price,
  });

  // const data = await blogModel.findByIdAndUpdate(req.params.id, req.body);
  // console.log(data, "update");

  if (!data) return res.status(404).json({ msg: "Not Found!!" });
  return res.send(data);
};

const deleteOne = async (req, res) => {
  await blogModel.findByIdAndDelete(req.params.id);
  return res.redirect("/");
};

const getBlogs = async (req, res) => {
  try {
    const allBlogs = await blogModel.find({ createdBy: req.user._id });
    return res.render("home", { blogs: allBlogs, user: req.user });
  } catch (error) {
    res.render("home", { error });
  }
};

const createBlogForm = async (req, res) => {
  return res.render("blog", { user: req.user });
};

module.exports = {
  create,
  getOne,
  update,
  deleteOne,
  getBlogs,
  createBlogForm,
};
