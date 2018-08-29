var helpers = {};
var db = require("../database");

// root Route
helpers.getBlogs = function(req, res) {
  // Get all campgrounds from DB

  db.blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("blog", { blogs: blogs });
    }
  });
};
// ======================== campground routes
// create route  , post to /campgrounds
helpers.insertBlog = function(req, res) {
  // get data from form and add to campgrounds array
  var newBlog = req.body.post;
  // // Create a new campground and save to DB
  db.blog.create(newBlog, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // console.log(newlyCreated._id);
      // req.user.posts.push(newlyCreated);
      // req.user.save();
      //redirect back to campgrounds page
      res.redirect("/blog");
    }
  });
};
// Show Campground information
helpers.newPost = function(req, res) {
  //find the campground with provided ID
  res.render("newBlog");
  // db.campground
  //   .findById(req.params.id)
  //   .populate("comments")
  //   .exec(function(err, foundCampground) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       // console.log(foundCampground)
  //       //render show template with that campground
  //       res.render("campgrounds/show", { campground: foundCampground });
  //     }
  //   });
};
// edit Camp ground form /campgrpuns/:id/edit
helpers.editCampgroundForm = function(req, res) {
  db.campground.findById(req.params.id, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/edit", { campground: found });
    }
  });
};
// edit campground put route
helpers.editCampground = function(req, res) {
  db.campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    campground
  ) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
};
// delete campground !
helpers.deleteCampground = function(req, res) {
  db.campground.findByIdAndDelete(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect("/campgrounds");
  });
};

module.exports = helpers;

// ============================== auth routes
var passport = require("passport");

// login post router
helpers.passportLogin = passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
});

helpers.logout = function(req, res) {
  req.flash("Success", "Logged out!");
  req.logout();
  res.redirect("/campgrounds");
};

helpers.register = function(req, res) {
  var newUser = new User(req.body.user);
  if (req.body.admincode === "secretcode123") {
    newUser.isAdmin = true;
  }
  if (req.body.avatar === "") {
    newUser.avatar = "/pictures/people.png";
  }
  db.user.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      req.flash("Error", err.message);
      return res.render("register", { error: err.message });
    }
    res.redirect("/login");
  });
};

helpers.loadUserInfoPage = function(req, res) {
  var posts = [];
  db.user.findById(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      var posts = getposts(req, res, user, redirect);
    }
  });
};

function getposts(req, res, user, next) {
  var posts = [];
  user.posts.forEach(function(post) {
    post = db.campground.findById(post, function(err, campground) {
      posts.push(campground);
      if (user.posts.length === posts.length) {
        return next(req, res, posts, user);
      }
    });
  });
}

function redirect(req, res, posts, user) {
  res.render("user", { user: user, posts: posts });
}

// ============================== comment Routes

helpers.newCommentRender = function(req, res) {
  db.campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", { campground: campground });
    }
  });
};

helpers.addNewComment = function(req, res) {
  db.campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      db.comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
};

helpers.editCommentTemplate = function(req, res) {
  db.comment.findById(req.params.commentid, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: comment
      });
    }
  });
};

helpers.editComment = function(req, res) {
  db.comment.findByIdAndUpdate(req.params.commentid, req.body.comment, function(
    err,
    comment
  ) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
};

helpers.deleteComment = function(req, res) {
  db.comment.findByIdAndDelete(req.params.commentid, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect("back");
  });
};
