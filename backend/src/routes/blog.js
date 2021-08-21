// const { Router } = require("express");
const express = require("express");
const router = express();
const blogcontroller = require("../controller/blog");

router.post("/createblog", blogcontroller.createblog);
router.post("/displayblog", blogcontroller.displayblog);

module.exports = router;
