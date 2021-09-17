const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: Storage,
  fileSize: 1024 * 1024 * 5,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      console.log("only jpg and png supported");
      callback(null, false);
    }
  },
});

module.exports = {
  upload,
};
