require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRoutes");
const blogRouter = require("./routers/blogRoutes");
const staticRouter = require("./routers/staticRoutes");
const { checkToken } = require("./middlewares/auth");
const commentRouter = require("./routers/commentRoutes");
const app = express();

//configurations
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));
mongoose
  .connect("mongodb://localhost:27017/mssBlogs")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err, "error in db connection"));

//middlewares
app.use(express.static(path.resolve("public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);

app.use(checkToken);

//routes
app.use("/comments", commentRouter);
app.use("/blogs", blogRouter);
app.use("/", staticRouter);

//listener
app.listen(process.env.PORT, () => {
  console.log(`Server Running on PORT: ${process.env.PORT}`);
});
