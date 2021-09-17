const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 3,
    },
    description: {
      type: String,
      require: true,
      minlength: 5,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = new mongoose.model("blog", blogSchema);

module.exports = Blog;
