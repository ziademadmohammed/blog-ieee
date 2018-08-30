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

router
  .route("/blog/:id")
  .get(helpers.showBlogExpanded) // SHOW - shows more info about one campground
  .put(middleware.isLoggedIn, helpers.editBlog) // Update Campground Route
  .delete(middleware.isLoggedIn, helpers.deleteBlog); // Delete Campground!
// .delete(middleware.isLoggedIn, helpers.deleteBlog); // Delete Campground!
//
// // Edit Campground Route
router.get("/blog/:id/edit", middleware.isLoggedIn, helpers.editBlogForm);

module.exports = router;
