var commentRoutes = require("./comments"),
  staticPagesRoutes = require("./staticPages"),
  authRoutes = require("./authRoutes");
blogRoutes = require("./blogRoutes");

var routes = {
  authRoutes: authRoutes,
  staticPagesRoutes: campgroundRoutes,
  commentRoutes: commentRoutes,
  blogRoutes: blogRoutes
};

module.exports = routes;
