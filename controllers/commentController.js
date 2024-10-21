const commentModel = require("../models/comments");
exports.create = async (req, res) => {
  try {
    if (!req.body.comment) throw new Error("comment fields are mandatory");
    await commentModel.create({
      comment: req.body.comment,
      createdBy: req.user._id,
      blog: req.body.blog,
    });
    return res
      .status(201)
      .render("blog", {
        message: "comment created successfully",
        user: req.user,
      });
  } catch (error) {
    return res.render("blog", { error });
  }
};
