var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://ziad:database-password1@ds239097.mlab.com:39097/ieee-zsb-blog");
var toExport = {};
toExport.user = require("./models/user");
toExport.blog = require("./models/blog");
toExport.socity = require("./models/socities");
// toExport.comment = require("./models/comment");

module.exports = toExport;
