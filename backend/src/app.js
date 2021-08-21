const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require("dotenv").config();
// const router = express();
// const userController = require("../src/controller/user");
const user = require("./routes/user");
const blog = require("./routes/blog");

require("./db/connection");
app.use(express.json());
// router.use();
// app.get("/", (req, res) => {
//   res.send("myapi");
// });
// app.use(express.json());

app.use(cors());
app.use("/", user);
app.use("/write", blog);

app.listen(port, () => {
  console.log(`you are now port number on ${port}`);
});
