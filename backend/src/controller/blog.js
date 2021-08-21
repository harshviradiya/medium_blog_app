const Blog = require("../model/blog");
const User = require("../model/user");

module.exports.createblog = async (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.body);
  try {
    if (!title || !description)
      return res.status(400).json({ msg: "enter all fields value 😏" });

    const userID = req.body.userId;
    const bloggg = await User.findOne({ _id: userID });

    const blog = new Blog(req.body);
    const resdata = await blog.save();
    res.send(resdata);
  } catch (error) {
    res.status(400).send("errorsss");
    next(error);
  }
};

module.exports.displayblog = async (req, res, next) => {
  try {
    const userID = req.body.userId;
    const bloggg = await Blog.find({});
    console.log("bloggggg----", bloggg);
    res.send(bloggg);
  } catch (error) {
    res.status(400).send(" backend error ");
    next(error);
  }
};
