var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  firstName:String,
  LastName:String,
  avatar:{type:String,default:"/pictures/people.png"},
  email:String,

  username:String,
  password:String,
  isAdmin:{type:Boolean,default:false},
  posts :[{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Campground"
  }]

});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);
