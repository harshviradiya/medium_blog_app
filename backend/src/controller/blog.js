const Blog = require("../model/blog");
const User = require("../model/user");

module.exports.createblog = async (req, res, next) => {
  const { title, description, image, userId } = req.body;

  try {
    if (!title || !description)
      return res.status(400).json({ msg: "enter all fields value 😏" });

    // const userID = req.body.userId;
    // const bloggg = await User.findOne({ _id: userID });

    if (req.file) {
      req.body.image = req.file.path;
    }
    const blog = new Blog(req.body);
    const resdata = await blog.save();

    res.send(resdata);
  } catch (error) {
    res.status(400).send("backend errrrrrrr");
    next(error);
  }
};

module.exports.displayblog = async (req, res, next) => {
  try {
    const userID = req.body.userId;
    const bloggg = await Blog.find({});

    let finalarray = [];
    if (bloggg.length > 0) {
      await bloggg.forEach(async (b, index) => {
        var userdetails = await User.findById(b.userId);
        var bodydata = {
          _id: b._id,
          userId: b.userId,
          title: b.title,
          description: b.description,
          image: b.image,
          email: userdetails.email,
          Firstname: userdetails.Firstname,
          Lastname: userdetails.Lastname,
          image1: userdetails.image,
        };
        finalarray.push(bodydata);
        if (bloggg.length == index + 1) {
          await res.send(finalarray);
        }
      });
    } else {
      await res.send(finalarray);
    }
  } catch (error) {
    res.status(400).send(" backend error ");
    next(error);
  }
};

module.exports.blogdetails = async (req, res, next) => {
  try {
    const BlogID = req.params.id;

    const blog = await Blog.find({ _id: BlogID });

    res.send(blog);
  } catch (error) {
    res.status(400).send(" backend error ");
    next(error);
  }
};

module.exports.updateblog = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (req.file) {
      req.body.image = req.file.path;
    }
    const userblog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.send({
      message: "Successfully Updated 🤗🤗",
      userblog,
    });
  } catch (error) {
    return res.status(400).json({ msg: "error" });
  }
};

module.exports.deleteblog = async (req, res, next) => {
  try {
    const BlogID = req.params.id;
    const deleteblog = await Blog.findByIdAndDelete({ _id: BlogID });
    if (!deleteblog) {
      return res.status(400).json({ msg: "blog not found 🤪" });
    }
    res.send({
      message: "Delete Successfully",
      deleteblog,
    });
    res.send(deleteblog);
  } catch (error) {
    res.status(400).send(" backend error ");
    next(error);
  }
};
