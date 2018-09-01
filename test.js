var db = require("./database")

db.socity.create({
  activities : [ "CS50", "CS101" ],
  name : "CS",
  description : "a bunch of geeks"
})
db.socity.create({
  "activities" : [ "ROBOTICS", "ROBOTICS101" ],
   "name" : "RAS",
    "description" : "a bunch of geeks"
})
