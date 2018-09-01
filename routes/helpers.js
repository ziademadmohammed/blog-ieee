var helpers = {};
var db = require("../database");
module.exports = helpers;
// root Route
helpers.getBlogs = function(req, res) {
  // Get all campgrounds from DB
  console.log(req.user);
  db.blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      db.socity.find({}, function(err, socities) {
        if (err) {
          console.log(err);
        } else {
          res.render("blog", { blogs: blogs, socities: socities });
        }
      });
    }
  });
};

helpers.getFilterdBogs = function(req,res){
  console.log(req.body.filter);
  var userFilter = req.body.filter
  var arr = []
  for(var key in userFilter){
    if(userFilter.hasOwnProperty(key)){
      arr.push(userFilter[key]);
    }
  }
  db.blog.find({socities:{$in:arr}},function(err,found){
    db.socity.find({}, function(err, socities) {
      if (err) {
        console.log(err);
      } else {
        res.render("blog", { blogs: found, socities: socities });
      }
    });
  })
}
// ======================== campground routes
// create route  , post to /campgrounds
helpers.insertBlog = function(req, res) {
  // get data from form and add to campgrounds array
  var newBlog = req.body.post;
  var socities = req.body.socities.split(" ");
  console.log(req.body);
  console.log(socities);
  // // Create a new campground and save to DB
  db.blog.create(newBlog, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      socities.forEach(function(item) {
        console.log(item);
        newlyCreated.socities.push(item);
      });
      newlyCreated.save();
      res.redirect("/blog");
    }
  });
};
// Show Campground information
helpers.newPost = function(req, res) {
  //find the campground with provided ID
  res.render("newBlog");
};

helpers.showBlogExpanded = function(req, res) {
  // .populate("comments")
  // .exec(
  db.blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundCampground)
      //render show template with that campground
      res.render("blog/show", { blog: blog });
    }
  });
};
// edit Camp ground form /campgrpuns/:id/edit
helpers.editBlogForm = function(req, res) {

  db.blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { blog: blog });
    }
  });
};
// edit campground put route
helpers.editBlog = function(req, res) {
  req.body.post.socities = req.body.post.socities.split(" ")
  db.blog.findByIdAndUpdate(req.params.id, req.body.post, function(
    err,
    campground
  ) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blog");
      // res.redirect("/blog/" + req.params.id);
    }
  });
};
// delete campground !
helpers.deleteBlog = function(req, res) {
  db.blog.findByIdAndDelete(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect("/blog");
  });
};
//================================== socities

helpers.newSocityForm = function(req,res){
  res.render("socities/newSocity")
}
helpers.insertSocity = function(req,res){
  req.body.socity.activities = req.body.socity.activities.split(" ")
  db.socity.create(req.body.socity,function(err,created){
    if(err){console.log(err);}
    else{
      res.redirect("/blog")
    }
  })
}

helpers.updateSocityForm = function(req,res){
  db.socity.findById(req.params.id,function(err,found){
    res.render("socities/editSocity",{socity : found})
  })
}

helpers.updateSocity = function(req,res){
  req.body.socity.activities = req.body.socity.activities.split(" ")
  console.log(req.body.socity.activities);
  db.socity.findByIdAndUpdate(req.params.id,req.body.socity,function(err,updated){
    res.redirect("/blog")
  })
}
helpers.deleteSocity = function(req, res) {
  db.socity.findByIdAndDelete(req.params.id, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect("/blog");
  });
};


// ============================== auth routes
var passport = require("passport");

// login post router
helpers.passportLogin = passport.authenticate("local", {
  session: true,
  successRedirect: "/blog",
  failureRedirect: "/login"
});

helpers.logout = function(req, res) {
  // req.flash("Success", "Logged out!");
  req.logout();
  res.redirect("/blog");
};

helpers.register = function(req, res) {
  var newUser = new db.user(req.body.user);
  db.user.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      // req.flash("Error", err.message);
      return res.render("register");
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
