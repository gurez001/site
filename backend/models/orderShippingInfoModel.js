const mongoose = require("mongoose");
const CountModel = require("./CountModel");

const shippingInfoSchema = new mongoose.Schema({
  shipping_uuid:{
    type: String,
  },
  fullName: {
    type: String,
   
  },
  phoneNo: {
    type: Number,
   
  },
  email: {
    type: String,
   
  },
  address: {
    type: String,
   
  },
  country: {
    type: String,
   
    default: "India",
  },
  state: {
    type: String,
   
  },
  city: {
    type: String,
   
  },
  pinCode: {
    type: Number,
   
  },
  order_info_uuid:{
    type: String,
    ref: "order",
  },
  user: {
    type: Number,
    ref: "User",
  },
});

module.exports = mongoose.model("shipping_Info", shippingInfoSchema);
