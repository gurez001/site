const catchAsyncError = require("../middleware/catchAsyncError");
const blogCategoreModel = require("../models/blogCategoreModel");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorhandler");

exports.createBlogCategore = catchAsyncError(async (req, res, next) => {
  const { name, slug, title, description } = req.body;
  let metaLink = slug.split(" ").join("-").toLowerCase();
  const user = req.user._id;

  const existingSlug = await blogCategoreModel.findOne({ slug: metaLink });

  if (existingSlug) {
    return next(
      new ErrorHandler(
        `Slug already exists. Please choose a different one.`,
        404
      )
    );
  }

  const newCategorie = await blogCategoreModel.create({
    name,
    slug: metaLink,
    title,
    description,
    user,
  });
  res.status(201).json({
    success: true,
    message: "Categore created successfully",
    newCategorie,
  });
});

exports.getAllBlogCategores = catchAsyncError(async (req, res, next) => {
  const allCategores = await blogCategoreModel.find();
  res.status(200).json({
    success: true,
    allCategores,
  });
});

exports.deleteBlogCategore = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  const existingPost = await blogCategoreModel.findById(id);

  if (!existingPost) {
    return next(new ErrorHandler("Post not found", 404));
  }

  await existingPost.deleteOne();
  res.status(200).json({
    success: true,
    message: "post has been deleted",
  });
});

exports.updateBlogCategore = catchAsyncError(async (req, res, next) => {
  const { name, slug, title, description } = req.body;
  let metaLink = slug.split(" ").join("-").toLowerCase();
  const user = req.user._id;
  const { id } = req.params;

  const data = {
    name,
    slug: metaLink,
    title,
    description,
    user,
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }

  const updatedCategory = await blogCategoreModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updatedCategory,
  });
});
