const catchAsyncError = require("../middleware/catchAsyncError");
const countModel = require("../models/CountModel");
const imageGelleryModel = require("../models/imageGelleryModel");
const ApiFetures = require("../utils/apiFeatuers");
const ErrorHandler = require("../utils/errorhandler");

exports.getAllImages = catchAsyncError(async (req, res, next) => {
  const resultPerpage = 20;
  const imageCount = await imageGelleryModel.countDocuments();

  const apiFetures = new ApiFetures(imageGelleryModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  // Execute the query
  let images = await apiFetures.query;

  res.status(200).json({
    success: true,
    images,
    imageCount,
    resultPerpage,
  });
});

//----------- create image createImageGellery

exports.createImageGellery = catchAsyncError(async (req, res, next) => {
  const { userid } = req.body;

  const productCounter = await countModel.findOne({ entityName: "User" });
  const images = [];

  const avatarPath = req.files;
  console.log(avatarPath)
  avatarPath.forEach((item, i) => {
    images.push({
      fieldname: item.fieldname,
      originalname: item.originalname,
      encoding: item.encoding,
      mimetype: item.mimetype,
      destination: item.destination,
      filename: item.filename,
      path: item.path,
      size: item.size,
      productId: userid,
    });
  });

  const imagesGellery = await imageGelleryModel.create(images);

  res.status(201).json({
    success: true,
    imagesGellery,
  });
});

//update --image seo

exports.updateImageSeo = catchAsyncError(async (req, res, next) => {
  res.status(201).json({
    success: true,
  });
});

exports.getImageFromIds = catchAsyncError(async (req, res, next) => {
  const { ids } = req.body;
  const image = await imageGelleryModel.find({ _id: { $in: ids } });
  res.status(200).json({
    success: true,
    image,
  });
});
