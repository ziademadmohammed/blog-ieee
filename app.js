var express = require("express"),
  app = express();

var db = require("./database");

'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var ip = process.env.IP || null;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address+"!!!!!!!!");
      ip = iface.address
    }
    ++alias;
  });
});

app.use(express.static(__dirname + "/public"));

//method override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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

var port = process.env.PORT || 4444;
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



app.listen(process.env.PORT,process.env.IP, function() {
  console.log(
    "The  Server Has Started!",
    process.env.IP,process.env.PORT
  );
});
