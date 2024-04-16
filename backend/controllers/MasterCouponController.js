const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorhandler");
const MasrterCouponModel = require("../models/MasrterCouponModel");
const productModels = require("../models/productModels");
const orderModels = require("../models/orderModels");
exports.createCouponMaster = catchAsyncError(async (req, res, next) => {
  const {
    allowFreeShipping,
    camount,
    couponExpiryDate,
    description,
    dtype,
    emails,
    excludeCategories,
    excludeProducts,
    excludeSaleItems,
    individualUseOnly,
    limitUsageToXItems,
    minimumSpend,
    maximumSpend,
    productCategories,
    products,
    usageLimitPerCoupon,
    usageLimitPerUser,
    name,
    uuid,
  } = req.body;
  const user = req.user._id;

  const newMasterCoupon = await MasrterCouponModel.create({
    master_coupon_uuid: uuid,
    master_coupon_code: name,
    master_coupon_name: name,
    master_coupon_desc: description,
    master_coupon_type: dtype,
    master_coupon_email: emails,
    master_coupon_limitUsageToXItems: limitUsageToXItems,
    master_coupon_amount: camount,
    master_coupon_start_date: new Date(), // Use Date object for the current date and time
    master_coupon_end_date: couponExpiryDate,
    master_coupon_allowFreeShipping: allowFreeShipping,
    master_coupon_min_spend: minimumSpend,
    master_coupon_max_spend: maximumSpend,
    master_coupon_excludeSaleItems: excludeSaleItems,
    master_coupon_products: products || [],
    // master_coupon_excludeProducts: excludeProducts,
    master_coupon_categories: productCategories || [],
    // master_coupon_exclude_Categories: excludeCategories || [],
    master_coupon_total_usage_limit: usageLimitPerCoupon,
    master_coupon_total_userwise_limit: usageLimitPerUser,
    master_coupon_created_date: new Date(), // Use Date object for the current date and time
    master_coupon_modifed_date: new Date(), // Use Date object for the current date and time
    master_coupon_individualUseOnly: individualUseOnly,
    user,
  });

  res.status(201).json({
    success: true,
    message: "Coupon added successfully",
    // newMasterCoupon,
  });
});

exports.getAllMasterCoupon = catchAsyncError(async (req, res, next) => {
  const allcoupon = await MasrterCouponModel.find().populate([
    { path: "user", model: "User" },
  ]);

  res.status(200).json({
    success: true,
    allcoupon,
  });
});

exports.verifyMasterCoupon = catchAsyncError(async (req, res, next) => {
  const { coupon, ids, subtotal } = req.body;
  const amount = Number(subtotal);
  const user = req.user._id;
  let data;
  const couponData = await MasrterCouponModel.findOne({
    master_coupon_code: coupon,
  });

  if (!couponData) {
    data = null;
    return next(new ErrorHandler("Invalid coupon.", 404));
  }
  if (couponData.master_coupon_total_userwise_limit !== 0) {
    const valid_user_range = await isWithinUserRange(
      couponData,
      orderModels,
      user
    );

    if (!valid_user_range) {
      return next(new ErrorHandler(`Coupon limit has executed`, 404));
    }
  }

  if (couponData.master_coupon_total_usage_limit !== 0) {
    const valid_user_limit_range = await isWithinUsagelimitRange(
      couponData,
      orderModels,
      user
    );

    if (!valid_user_limit_range) {
      return next(new ErrorHandler(`Coupon limit has executed`, 404));
    }
  }

  if (
    couponData.master_coupon_min_spend !== 0 &&
    couponData.master_coupon_max_spend !== 0
  ) {
    const valid_min_max_amount = isMinAmount(couponData, amount);
    if (!valid_min_max_amount) {
      return next(
        new ErrorHandler(
          `Purchase range should be ${couponData.master_coupon_min_spend} to ${couponData.master_coupon_max_spend}`,
          404
        )
      );
    }
  } else {
    if (
      couponData.master_coupon_min_spend > 1 &&
      couponData.master_coupon_min_spend < 2
    ) {
      const valid_max_amount = isMaxAmount(couponData, amount);
      if (!valid_max_amount) {
        return next(
          new ErrorHandler(
            `Purchase amount should be lower than ${couponData.master_coupon_max_spend}`,
            404
          )
        );
      }
    }
    if (couponData.master_coupon_min_spend > 1) {
      const valid_min_amount = isMinMaxAmount(couponData, amount);
      if (!valid_min_amount) {
        return next(
          new ErrorHandler(
            `Purchase amount should be greater than ${couponData.master_coupon_min_spend}`,
            404
          )
        );
      }
    }
  }
  const valid_date = isWithinDateRange(couponData);
  if (!valid_date) {
    data = null;
    return next(new ErrorHandler("Coupon has been expired.", 404));
  }

  if (couponData.master_coupon_type === "Percentage discount") {
    data = applyCartPercentageDiscount("percentage", couponData);
  } else if (couponData.master_coupon_type === "Fixed basket discount") {
    data = applyCartFixedBasketDiscount("fix items", couponData);
  }

  res.status(200).json({
    success: true,
    coupon: data,
  });
});

async function isWithinUsagelimitRange(coupon, orders, user) {
  const coupon_code = coupon.master_coupon_code;
  const order = await orders.find({ master_coupon_code: coupon_code, user });
  const filter_order = order.filter(
    (item) => item.order_info_status === "Delivered"
  );
 
  if (coupon.master_coupon_total_usage_limit > filter_order.length) return true;
}

async function isWithinUserRange(coupon, orders, user) {
  const coupon_code = coupon.master_coupon_code;
  const order = await orders.find({ master_coupon_code: coupon_code, user });
  const filter_order = order.filter(
    (item) => item.order_info_status === "Delivered"
  );

  if (coupon.master_coupon_total_userwise_limit > filter_order.length)
    return true;
}
function isMinMaxAmount(coupon, amount) {
  const max_amount = coupon.master_coupon_max_spend;
  const min_amount = coupon.master_coupon_min_spend;
  if (amount < max_amount && amount > min_amount) return true;
}

function isMaxAmount(coupon, amount) {
  const max_amount = coupon.master_coupon_max_spend;
  if (amount < max_amount) return true;
}

function isMinAmount(coupon, amount) {
  const min_amount = coupon.master_coupon_min_spend;
  if (amount > min_amount) return true;
}

function isWithinDateRange(coupon) {
  const date = Date.now();
  const current_date = new Date(date);
  const start_date = coupon.master_coupon_start_date;
  const end_date = coupon.master_coupon_end_date;
  if (end_date !== null) {
    if (start_date < current_date && current_date < end_date) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

function applyCartPercentageDiscount(type, coupon) {
  coupondata = {
    type: type,
    name: coupon.master_coupon_name,
    disscount: coupon.master_coupon_amount,
    uuid: coupon.master_coupon_uuid,
    productid: null,
    message: "Coupon applied successfully!",
  };
  return coupondata;
}

function applyCartFixedBasketDiscount(type, coupon) {
  coupondata = {
    type: type,
    name: coupon.master_coupon_name,
    uuid: coupon.master_coupon_uuid,
    disscount: coupon.master_coupon_amount,
    productid: null,
    message: "Coupon applied successfully!",
  };
  return coupondata;
}

//--------single coupon data--------------------

exports.singleCouponData = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await MasrterCouponModel.findOne({ master_coupon_uuid: id });
    if (!data) {
      return next(new ErrorHandler("id not found", 404));
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new ErrorHandler("server not responsding", 400));
  }
});

//------------------single update coupon-----------------

exports.update_coupon = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      allowFreeShipping,
      camount,
      couponExpiryDate,
      description,
      dtype,
      emails,
      excludeCategories,
      excludeProducts,
      excludeSaleItems,
      individualUseOnly,
      limitUsageToXItems,
      minimumSpend,
      maximumSpend,
      productCategories,
      products,
      usageLimitPerCoupon,
      usageLimitPerUser,
      name,
    } = req.body;

    let data = await MasrterCouponModel.findOne({ master_coupon_uuid: id });
    if (!data) {
      return next(new ErrorHandler("id not found", 404));
    }
    const inputvalue = {
      master_coupon_code: name,
      master_coupon_name: name,
      master_coupon_desc: description,
      master_coupon_type: dtype,
      master_coupon_email: emails,
      master_coupon_limitUsageToXItems: limitUsageToXItems,
      master_coupon_amount: camount,
      master_coupon_end_date: couponExpiryDate,
      master_coupon_allowFreeShipping: allowFreeShipping,
      master_coupon_min_spend: minimumSpend,
      master_coupon_max_spend: maximumSpend,
      master_coupon_excludeSaleItems: excludeSaleItems,
      master_coupon_products: products || [],
      // master_coupon_excludeProducts: excludeProducts,
      master_coupon_categories: productCategories || [],
      // master_coupon_exclude_Categories: excludeCategories || [],
      master_coupon_total_usage_limit: usageLimitPerCoupon,
      master_coupon_total_userwise_limit: usageLimitPerUser,
      master_coupon_created_date: new Date(), // Use Date object for the current date and time
      master_coupon_modifed_date: new Date(), // Use Date object for the current date and time
      master_coupon_individualUseOnly: individualUseOnly,
    };

    const updateData = await MasrterCouponModel.findOneAndUpdate(
      { master_coupon_uuid: id },
      inputvalue,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ success: true, updateData });
  } catch (error) {
    return next(new ErrorHandler(`server not responsding,${error}`, 400));
  }
});
