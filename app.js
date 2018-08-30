var express = require("express"),
  app = express();

var db = require("./database");

app.use(express.static(__dirname + "/public"));

var cookieParser = require("cookie-parser");
app.use(cookieParser());
//body-parsee
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

//method override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var port = process.env.PORT || 4000;

// require("./auth");
var passport = require("passport");
var LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.user.authenticate()));
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());
// username
app.use(function(req, res, next) {
  res.locals.currentuser = req.user;
  // res.locals.error = req.flash("Error");
  // res.locals.success = req.flash("Success");
  next();
});

var routes = require("./routes");

app.use(routes.authRoutes);
app.use(routes.blogRoutes);

app.listen(port, function() {
  console.log(
    "The YelpCamp Server Has Started!",
    process.env.PORT,
    process.env.IP
  );
});
