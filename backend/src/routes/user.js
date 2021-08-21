const { Router } = require("express");
const express = require("express");
const router = express();
const userController = require("../controller/user");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
