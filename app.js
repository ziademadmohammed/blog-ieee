var express = require("express"),
  app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.render("landing");
});

app.listen(port, function() {
  console.log(
    "The YelpCamp Server Has Started!",
    process.env.PORT,
    process.env.IP
  );
});
