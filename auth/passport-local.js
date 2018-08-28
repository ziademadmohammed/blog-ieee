var passport = require("passport");
var LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(db.user.authenticate()));
passport.serializeUser(db.user.serializeUser());
passport.deserializeUser(db.user.deserializeUser());
