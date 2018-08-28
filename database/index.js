var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/yelpcamp_refactor");
var toExport = {};
toExport.user = require("./models/user");
toExport.campground = require("./models/campground");
toExport.comment = require("./models/comment");

module.exports = toExport;
