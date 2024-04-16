// const products = require("../models/productModels");
const reviewsSchema = require("../models/reviewsModel");
const ErrorHandler = require("../utils/errorhandler");
const {
  Types: { ObjectId },
} = require("mongoose");

const catchAsyncError = require("../middleware/catchAsyncError");
const CountModel = require("../models/CountModel");
const productModels = require("../models/productModels");
const ApiFetures = require("../utils/apiFeatuers");

//--------create new review and update the reviews

exports.createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId, product_uuid, review_uuid } = req.body;

  const user = req.user;
  const product = await productModels.findOne({
    product_uuid,
  });

  const reviews = {
    user: user._id,
    rating,
    product_uuid,
    review_uuid,
    productid: productId,
    comment,
  };

  let isExistReview = await reviewsSchema.findOne({
    productid: productId,
    user: user._id,
  });

  if (!isExistReview) {
    const newReview = await reviewsSchema.create(reviews);

    let revilength = await reviewsSchema.find({
      product_uuid,
    });

    const length = revilength.length;
    const sum = revilength.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / length;
    product.product_ratings = length;
    product.product_ratings_average = average;
    await product.save();
    res.status(201).json({
      message: "Review created successfully",
      newReview,
    });
    return;
  }

  isExistReview.rating = rating;
  isExistReview.comment = comment;
  isExistReview.review_modified_date = new Date();
  await isExistReview.save();

  let revilength = await reviewsSchema.find({
    product_uuid,
  });
  const length = revilength.length;
  const sum = revilength.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / length;

  product.product_ratings = length;
  product.product_ratings_average = average.toFixed(2);
  await product.save();

  res.status(200).json({
    message: "Review updated successfully",
    isExistReview,
  });
});

//--------get All reviews

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const productReview = await reviewsSchema
    .find()
    .populate([{ path: "user", model: "User" }]);

  if (!productReview) {
    return next(new ErrorHandler("Product review not found", 404));
  }

  res.status(200).json({
    success: true,
    productReview,
  });
});

exports.get_product_review = catchAsyncError(async (req, res, next) => {
  const resultPerpage = 3;
  const reviewLength = await reviewsSchema.find({
    product_uuid: req.query.product_uuid,
  });
  const apiFetures = new ApiFetures(reviewsSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);

  const review = await apiFetures.query.populate([
    { path: "user", model: "User" },
  ]);

  const sum = reviewLength.reduce((acc, review) => acc + review.rating, 0);
  const length = reviewLength.length;
  const average = sum / length;

  res.status(200).json({
    success: true,
    review,
    reviewLength: length,
    resultPerpage,
    review_average: average.toFixed(2),
  });
});

// //--------Delete reviews

// exports.DeleteProductReviews = catchAsyncError(async (req, res, next) => {
//
//     let Product = await products.findById(req.query.productId);
//     if (!Product) {
//       return next(new ErrorHandler("Product not found", 404));
//     }
//     const reviews = Product.reviews.filter((rev) => {
//       return rev._id.toString() !== req.query.id.toString();
//     });

//     let review_avg = 0;

//     reviews.forEach((rev) => {
//       review_avg += rev.rating;
//     });

//     const ratings = reviews.length > 0 ? review_avg / reviews.length : 0; // Check if reviews array is empty

//     const numOfReviews = reviews.length;

//     await products.findByIdAndUpdate(
//       req.query.productId,
//       {
//         reviews,
//         ratings,
//         numOfReviews,
//       },
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       reviews: reviews,
//       message: "Review removed",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(" Internal Error prodduct not delete", 500));
//   }
// });
