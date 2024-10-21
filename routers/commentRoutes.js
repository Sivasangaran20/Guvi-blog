const express = require("express");
const { create } = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter.post("/", create);

module.exports = commentRouter;
