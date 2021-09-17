const { Router } = require("express");
const express = require("express");
const { upload } = require("../Middelware");
const router = express();
const userController = require("../controller/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/Userdetails/:id", userController.userdetails);
router.get("/userblogdetails/:id", userController.userblogdetails);
router.patch(
  "/Updateuser/:id",
  upload.single("image"),
  userController.Updateuser
);

module.exports = router;
