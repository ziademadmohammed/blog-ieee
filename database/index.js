var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/ieee-zsp-site");
var toExport = {};
toExport.user = require("./models/user");
toExport.campground = require("./models/blog");
toExport.comment = require("./models/comment");

module.exports = toExport;
