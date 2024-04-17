const catchAsyncError = require("../middleware/catchAsyncError");

exports.add_new_banner = catchAsyncError(async (req, res, next) => {
  const {
    banner_setting_uuid,
    banner_setting_id,
    banner_setting_name,
    banner_setting_images,
    banner_setting_limit,
  } = req.body;
  console.log(req.body)
  res.status(201).json({
    success: true,
  });
});
