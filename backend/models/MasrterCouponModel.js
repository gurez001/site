const mongoose = require("mongoose");

const masterCouponSchema = new mongoose.Schema({
  master_coupon_uuid: {
    type: String,
    required: true,
    trim: true,
  },
  master_coupon_code: {
    type: String,
    required: true,
    trim: true,
  },
  master_coupon_name: {
    type: String,
    required: true,
    trim: true,
  },
  master_coupon_desc: {
    type: String,
    trim: true,
  },
  master_coupon_type: {
    type: String,
    trim: true,
    required: true,
  },
  master_coupon_email: {
    type: String,
    trim: true,
  },
  master_coupon_allow_FreeShipping: {
    type: Boolean,
    default: false,
  },
  master_coupon_limit_UsageToXItems: {
    type: Number,
  },
  master_coupon_amount: {
    type: Number,
  },
  master_coupon_start_date: {
    type: Date,
  },
  master_coupon_end_date: {
    type: Date,
    default: null,
  },
  master_coupon_day_start_time: {
    type: Date,
  },
  master_coupon_day_end_time: {
    type: Date,
  },
  master_coupon_min_spend: {
    type: Number,
  },
  master_coupon_excludeSaleItems: {
    type: String,
    trim: true,
  },
  master_coupon_max_spend: {
    type: Number,
  },
  master_coupon_products: {
    type: Array,
  },

  // master_coupon_exclude_Products: [
  //   {
  //     type: Number,
  //     ref: "Product",
  //   },
  // ],
  master_coupon_categories: [
    {
      type: String,
      ref: "Categore",
    },
  ],
  master_coupon_subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categore",
    },
  ],
  master_coupon_exclude_Categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categore",
    },
  ],
  master_coupon_exclude_SubCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categore",
    },
  ],
  master_coupon_total_usage_limit: {
    type: Number,
    default: null,
  },

  master_coupon_total_userwise_limit: {
    type: Number,
    default: null,
  },
  show_in_listing: {
    type: Boolean,
    default: true,
  },
  master_coupon_image: {
    type: String,
    default: null,
  },
  master_coupon_tnc: {
    type: String,
    default: null,
  },
  buy_x_get_y_drink: {
    type: Boolean,
    default: false,
  },
  master_coupon_created_date: {
    type: Date,
    default: null,
  },
  master_coupon_modifed_date: {
    type: Date,
    default: null,
  },
  master_coupon_status: {
    type: String,
    default: "Active",
  },
  master_coupon_is_deleted: {
    type: String,
    default: "No",
  },
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("masterCoupon", masterCouponSchema);
