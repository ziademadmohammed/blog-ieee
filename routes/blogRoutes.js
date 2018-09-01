var express = require("express");
var router = express.Router();
var db = require("../database");
var middleware = require("../middleware/index.js");
const helpers = require("./helpers");

router.get("/", function(req, res) {
  res.render("landing");
});

router
  .route("/blog")
  .get(helpers.getBlogs)
  .post(helpers.insertBlog);

router.get("/blog/new", helpers.newPost);

router.post("/blog/filter",helpers.getFilterdBogs)

router
  .route("/blog/:id")
  .get(helpers.showBlogExpanded) // SHOW - shows more info about one blog
  .put(middleware.isLoggedIn, helpers.editBlog) // Update blog Route
  .delete(middleware.isLoggedIn, helpers.deleteBlog); // Delete blog!

// // Edit blog Route
router.get("/blog/:id/edit", middleware.isLoggedIn, helpers.editBlogForm);

// socities

// router.route("/socity/edit/:id")
router.route("/socity/new")
  .get( middleware.isLoggedIn,helpers.newSocityForm)
  .post( middleware.isLoggedIn,helpers.insertSocity)

router.route("/socity/:id")
  .get(helpers.updateSocityForm)
  .put(helpers.updateSocity)
  .delete(helpers.deleteSocity)

module.exports = router;
