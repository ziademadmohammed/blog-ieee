var express = require("express");
var router = express.Router();
var db = require("../models");
var middleware = require("../middleware/index.js");
const helpers = require("./helpers");

router
  .route("/blog")
  .get(helpers.findCampgrounds)
  .post(middleware.isLoggedIn, helpers.insertCampground);

router.get("/blog/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new.ejs");
});

router
  .route("/blog/:id")
  .get(helpers.showCampgroundInfo) // SHOW - shows more info about one campground
  .put(middleware.isLoggedIn, middleware.isOwner, helpers.editCampground) // Update Campground Route
  .delete(middleware.isLoggedIn, middleware.isOwner, helpers.editCampground); // Delete Campground!

// Edit Campground Route
router.get(
  "/blog/:id/edit",
  middleware.isLoggedIn,
  middleware.isOwner,
  helpers.editCampgroundForm
);

module.exports = router;
