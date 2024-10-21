const express = require("express");
const { home } = require("../controllers/staticController");
const staticRouter = express.Router();

staticRouter.get("/", home);
module.exports = staticRouter;
