const express = require("express");
const {
  create,
  getOne,
  deleteOne,
  getBlogs,
  createBlogForm,
} = require("../controllers/blogController");
const multer = require("multer");
const path = require("path");
const { checkAbility } = require("../middlewares/auth.js");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${String(Date.now())}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const blogRouter = express.Router();

blogRouter.get("/create", createBlogForm);

blogRouter.post("/", upload.single("coverImage"), create);

blogRouter.get("/blog", getBlogs);

blogRouter.get("/:id", getOne);

blogRouter.delete("/:id", checkAbility("Admin"), deleteOne);

module.exports = blogRouter;
