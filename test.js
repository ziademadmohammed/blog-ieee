var db = require("./database");

db.socity.create(
  {
    name: "Ras",
    description: "a bunch of geeks",
    activities: ["Robotics", "Robotics101"]
  },
  function(err, created) {
    console.log(created);
  }
);
