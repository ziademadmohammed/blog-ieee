var express     = require("express");
var router = express.Router();
var helpers = require("./helpers");
var middleware = require("../middleware/index.js");


router.get("/", function(req, res){
    res.render("campgrounds/landing");
});

router.route("/login")
  .get((req,res) => {res.render("login", {page: 'login'})})
  .post(helpers.passportLogin);

router.route("/register")
  .get((req,res) => {res.render("register", {page: 'register'})})
  .post(helpers.register);

router.get("/logout",helpers.logout);

router.get("/user/:id",middleware.isLoggedIn,middleware.isPageOwner,helpers.loadUserInfoPage);


module.exports = router;
