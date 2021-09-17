const IMAGE = require("../model/image");

module.exports.imageuploads = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    console.log("000000000000000000000000000", req.body);
    const image = new IMAGE(req.body);
    const resdata = await image.save();
    res.send(resdata);
  } catch (error) {
    res.status(400).send("backend errrrrrrr");
    next(error);
  }
};
