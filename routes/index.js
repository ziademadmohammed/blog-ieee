var commentRoutes = require("./comments") ,
    campgroundRoutes = require("./campgrounds") ,
    authRoutes = require("./extarroutes");

var routes = {
  authRoutes :authRoutes ,
  campgroundRoutes : campgroundRoutes ,
  commentRoutes : commentRoutes
};

module.exports = routes;
