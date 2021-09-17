const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //    const token= jwt.sign({ id: user._id },process.env.JWT_SECRET)
  const token = req.header("x-auth-token");
  console.log("aaa", token);
  try {
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified token", verified);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, access denied." });
    req.user = verified.id;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { auth };
