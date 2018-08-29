var express = require("express"),
  app = express();

var db = require("./database");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

//method override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

var port = process.env.PORT || 4000;
//body-parsee
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/blogRoutes");
app.use(routes);

app.get("/", function(req, res) {
  res.render("landing");
});
app.get("/blog", function(req, res) {
  res.render("blog");
});
// username
app.use(function(req, res, next) {
  res.locals.currentuser = req.user;
  // res.locals.error = req.flash("Error");
  // res.locals.success = req.flash("Success");
  next();
});

app.listen(port, function() {
  console.log(
    "The YelpCamp Server Has Started!",
    process.env.PORT,
    process.env.IP
  );
});
