var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  header: String,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  mainSocity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "socity"
  }],
  socities: [String],
});

module.exports = mongoose.model("Blog", blogSchema);
