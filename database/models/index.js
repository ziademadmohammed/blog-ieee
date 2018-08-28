var mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.connect("mongodb://localhost/yelpcamp_refactor");
var toExport = {};
toExport.user = require("./user");
toExport.campground = require("./campground");
toExport.comment = require("./comment");


module.exports = toExport;
