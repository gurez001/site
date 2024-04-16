const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const orderSchema = new mongoose.Schema({
  _id: Number,
  order_info_uuid: {
    type: String,
  },
  order_info_shipping_charges: {
    type: Number,
    default: 0,
  },
  order_info_customer: {
    type: Number,
  },
  order_info_total_price: {
    type: Number,
    default: 0,
  },
  order_info_total_order_quantity: {
    type: Number,
    default: 0,
  },
  order_info_total_discount: {
    type: String,
    default: null,
  },
  order_info_total_coupon_discount: {
    type: Number,
    default: 0,
  },

  order_info_total_wallet_discount: {
    type: Number,
    default: 0,
  },
  master_coupon_uuid: {
    type: String,
  },
  master_coupon_code: {
    type: String,
    default: null,
  },
  order_info_gst: {
    type: Number,
    default: 0,
  },
  order_info_service_tax: {
    type: Number,
    default: 0,
  },
  order_info_grand_total: {
    type: Number,
    default: 0,
  },
  order_info_mode: {
    type: String,
  },
  order_info_delivery_date: {
    type: Date,
    default: null,
  },
  order_info_created_date: {
    type: Date,
    default: Date.now,
  },
  order_info_modified_date: {
    type: Date,
    default: null,
  },
  order_info_status: {
    type: String,
    default: "Proccessing",
  },
  order_info_is_deleted: {
    type: String,
    default: "No",
  },
  //----------------------------------------------------------

  user: {
    type: Number,
    ref: "User",
  },
});

orderSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    // const Counter = mongoose.model('Counter');
    const counter = await CountModel.findOneAndUpdate(
      { entityName: "User" }, // Use a unique name for each entity
      { $inc: { orderCount: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.orderCount;

    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("order", orderSchema);
