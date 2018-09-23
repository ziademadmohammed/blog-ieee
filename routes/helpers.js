var helpers = {};
var db = require("../database");
module.exports = helpers;
var cloudinary = require('cloudinary');


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
helpers.insertBlog = async function(req, res) {
  var image = await cloudinary.uploader.upload(req.file.path)

  req.body.post.image = image.secure_url;
  var newBlog = req.body.post;
  var socities = req.body.socities.split(" ");

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
helpers.newPost = async function(req, res) {
  var socities = await db.socity.find({})
  //find the campground with provided ID
  console.log(socities);
  
  res.render("newBlog",{socities : socities});
};

helpers.showBlogExpanded = async function(req, res) {
  // .populate("comments")
  // .exec(
  var blogs = await db.blog.findById(req.params.id)
  // console.log(blogs);
  var socity = await db.socity.findById(blogs.mainSocity[0])
  
  // console.log(socity);
  db.blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundCampground)
      //render show template with that campground
      res.render("blog/show", { blog: blog,socity:socity });
    }
  });
};
// edit Camp ground form /campgrpuns/:id/edit
helpers.editBlogForm = async function(req, res) {
  var socities = await db.socity.find({})

  db.blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { blog: blog ,socities:socities});
    }
  });
};
// edit campground put route
helpers.editBlog = function(req, res) {
  console.log(req.body.post);
  
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



