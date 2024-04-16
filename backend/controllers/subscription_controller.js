const catchAsyncError = require("../middleware/catchAsyncError");
const subscription_model = require("../models/subscription_model");

exports.email_subscription = catchAsyncError(async (req, res, next) => {
  const { email, uuid } = req.body;

  const subscription = await subscription_model.create({
    email,
    uuid,
  });
  res.status(200).json({
    success: true,
    subscription,
  });
});
