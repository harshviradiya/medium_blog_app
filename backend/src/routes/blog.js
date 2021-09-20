// const { Router } = require("express");
const express = require("express");
const router = express();
const blogcontroller = require("../controller/blog");
const { upload } = require("../Middelware");

router.post("/createblog", upload.single("image"), blogcontroller.createblog);
router.post("/displayblog", blogcontroller.displayblog);
router.get("/Blogdetails/:id", blogcontroller.blogdetails);
router.patch(
  "/Updateblog/:id",
  upload.single("image"),
  blogcontroller.updateblog
);
router.delete("/Deleteblog/:id", blogcontroller.deleteblog);
module.exports = router;
