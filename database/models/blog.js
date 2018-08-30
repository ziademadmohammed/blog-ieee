var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  header: String,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  socities: [String],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Blog", blogSchema);
