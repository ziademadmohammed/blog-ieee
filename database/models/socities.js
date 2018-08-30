var mongoose = require("mongoose");

var socitiesSchema = new mongoose.Schema({
  name: String,
  logo: String,
  description: String,
  activities: [String]
});

module.exports = mongoose.model("Socity", socitiesSchema);
