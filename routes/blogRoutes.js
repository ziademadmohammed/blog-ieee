var express = require("express");
var router = express.Router();
var db = require("../database");
var middleware = require("../middleware/index.js");
const helpers = require("./helpers");
//  Cloudinary !!!

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'ieee-blog', 
  api_key: "893342911184496", 
  api_secret: "msoKeX_cSVEhOn_OiQoZC4BYfOM"
});

router.get("/", function(req, res) {
  // res.render("landing")
  res.redirect("/blog");
});

router
  .route("/blog")
  .get(helpers.getBlogs)
  .post(middleware.isLoggedIn,upload.single('image'),helpers.insertBlog);

router.get("/blog/new", middleware.isLoggedIn,helpers.newPost);

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
  .get(middleware.isLoggedIn,helpers.updateSocityForm)
  .put(middleware.isLoggedIn,helpers.updateSocity)
  .delete(middleware.isLoggedIn,helpers.deleteSocity)

module.exports = router;
