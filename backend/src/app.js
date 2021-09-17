const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");

const router = express();
// const userController = require("../src/controller/user");
const user = require("./routes/user");
const blog = require("./routes/blog");
// const image = require("./routes/image");
// const multiparty = require("connect-multiparty");
// const multipartMiddleware = multiparty({ uploadDir: "./uploads " });

app.use(bodyParser.urlencoded({ extended: true }));

require("./db/connection");
app.use(express.json());
app.use(bodyParser.json());
// router.use();

// app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use("/", user);
app.use("/write", blog);
// app.use("/image", image);
app.listen(port, () => {
  console.log(`you are now port number on ${port}`);
});
