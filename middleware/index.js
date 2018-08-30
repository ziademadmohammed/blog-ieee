var db = require("../database");
middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

middlewareObj.isPageOwner = function(req, res, next) {
  db.user.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      if (
        user._id.equals(req.user._id) ||
        (req.user.isAdmin && req.user.isAdmin)
      ) {
        return next();
      } else {
        req.flash("Error", "You don't have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  });
};

middlewareObj.isOwner = function(req, res, next) {
  db.campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      if (
        foundCampground.author.id.equals(req.user._id) ||
        (req.user.isAdmin && req.user.isAdmin)
      ) {
        console.log("Next");
        return next();
      } else {
        req.flash("Error", "You don't have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  });
};

middlewareObj.isCommentOwner = function(req, res, next) {
  db.comment.findById(req.params.commentid, function(err, foundComment) {
    if (err) {
      console.log(err);
    } else {
      if (
        foundComment.author.id.equals(req.user._id) ||
        (req.user.isAdmin && req.user.isAdmin)
      ) {
        return next();
      } else {
        req.flash("Error", "You don't have permission to do that.");
        res.redirect("back");
      }
    }
  });
};

module.exports = middlewareObj;
