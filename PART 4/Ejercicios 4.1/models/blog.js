const mongoose = require("mongoose");
const { MONGO_URI } = require("../utils/cofig.js");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(MONGO_URI);

module.exports = Blog;
