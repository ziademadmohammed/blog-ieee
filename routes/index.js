// var commentRoutes = require("./comments"),
// staticPagesRoutes = require("./staticPages"),
var authRoutes = require("./authRoutes");
blogRoutes = require("./blogRoutes");

var routes = {
  authRoutes: authRoutes,

  blogRoutes: blogRoutes
};
// staticPagesRoutes: campgroundRoutes,
// commentRoutes: commentRoutes,
module.exports = routes;
