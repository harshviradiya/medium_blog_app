const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv").config();
// const bodyParser = require("body-parser");

const router = express();
// const userController = require("../src/controller/user");
const user = require("./routes/user");
const blog = require("./routes/blog");
// app.use(require("connect").bodyParser());
// const image = require("./routes/image");
// const multiparty = require("connect-multiparty");
// const multipartMiddleware = multiparty({ uploadDir: "./uploads " });
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(express.urlencoded({ extended: true }));

require("./db/connection");
app.use(express.json());
// app.use(express.bodyParser());
// app.use(bodyParser.json());
// router.use();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use("/", user);
app.use("/write", blog);
// app.use("/image", image);
app.listen(port, () => {
  console.log(`you are now port number on ${port}`);
});
