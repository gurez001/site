const catchAsyncError = require("../middleware/catchAsyncError");
const blogCommentModel = require("../models/BlogCommentModel");
const ErrorHandler = require("../utils/errorhandler");

exports.createcomment = catchAsyncError(async (req, res, next) => {
  const { comment, blogId } = req.body;
  const user = req.user._id;
  const commentdata = await blogCommentModel.create({
    comment,
    blogId,
    user,
  });

  res.status(201).json({ success: true });
});

exports.getcomment = catchAsyncError(async (req, res, next) => {
  const commentdata = await blogCommentModel.find().populate({
    path: "user",
    model: "User",
  });
  res.status(200).json({ success: true, commentdata });
});
