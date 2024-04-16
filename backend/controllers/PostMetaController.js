const PostMetaModel = require("../models/PostMetaModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.getPostMetaSingleValue = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let postMetaValue = await PostMetaModel.findOne({ meta_uuid: id });
  // if product not found
  // if (!postMetaValue) {
  //   // No products found
  //   return next(new ErrorHandler("No post meta Value found", 404));
  // }
  // if product found
  res.status(200).json({
    success: true,
    postMetaValue,
  });
});
