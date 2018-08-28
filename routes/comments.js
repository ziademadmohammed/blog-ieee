var express = require("express");
var router = express.Router();
var helpers = require("./helpers");
var middleware = require("../middleware/index.js");
//CREATE COMMENT
router.get(
  "/campgrounds/:id/comment/new",
  middleware.isLoggedIn,
  helpers.newCommentRender
);

//ADD COMMENT
router.post(
  "/campgrounds/:id/comment",
  middleware.isLoggedIn,
  helpers.addNewComment
);

// EDIT Comment
router.get(
  "/campgrounds/:id/comment/:commentid/edit",
  middleware.isLoggedIn,
  middleware.isCommentOwner,
  helpers.editCommentTemplate
);
// update a comment
router.put(
  "/campgrounds/:id/comment/:commentid",
  middleware.isLoggedIn,
  middleware.isCommentOwner,
  helpers.editComment
);
//delete comments
router.delete(
  "/campgrounds/:id/comment/:commentid",
  middleware.isLoggedIn,
  middleware.isCommentOwner,
  helpers.deleteComment
);

module.exports = router;
