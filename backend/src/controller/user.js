const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

module.exports.register = async (req, res, next) => {
  const { Firstname, Lastname, email, password, conformpassword } = req.body;
  console.log(req.body);

  try {
    if (!password || !conformpassword || !email || !Firstname || !Lastname)
      return res.status(400).json({ msg: "enter all fields value" });

    if (password.length < 5) {
      return res.status(400).json({ msg: "Password is too small, try harder" });
    }
    if (password != conformpassword)
      return res.status(400).json({ msg: "Password don't match 😁😁" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "email exists, think of something unique 🦄" });

    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      Firstname,
      Lastname,
    });
    const response = await newUser.save();
    res
      .status(200)
      .json({ msg: "hurray!!! 😂😂  Register Sucessfull ✨🎀🎁🎗🎆🎇" });
  } catch (error) {
    if (error.name === "ValidationError") return res.status(422);
    next(error);
  }
};
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    if (!email || !password)
      return res.status(400).json({ msg: "please fill the all feild" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "user not found" });

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) return res.status(400).json({ msg: "invalid credantial" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
      message: "Login Successfully",
    });
  } catch (error) {
    return res.status(400).json({ msg: "error" });
  }
};
