const Razorpay = require("razorpay");
const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto");
const orderModels = require("../models/orderModels");
const ErrorHandler = require("../utils/errorhandler");
const axios = require("axios");
const OrdersPaymentsInfoModel = require("../models/OrdersPaymentsInfoModel");
const order_Model = require("../models/orderModels");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

exports.proccessPayment = catchAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const sign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isMatch = sign === razorpay_signature;
  if (isMatch) {
    try {
      const existingOrder = await orderModels.findOne({
        "paymentInfo.razorpay_order_id": razorpay_order_id,
      });

      if (existingOrder) {
        // Update the existing order's payment information and other fields
        existingOrder.paymentInfo = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        };
        existingOrder.mode = "online";
        existingOrder.paidAt = Date.now();

        const order = await instance.payments.fetch(razorpay_payment_id);

        existingOrder.paymentInfo.id = order.id;

        await existingOrder.save();

        // Save the updated existingOrder with paymentInfo.data
        res.redirect(
          `http://localhost:3000/order/success?reference=${razorpay_order_id}`
        );
      }

      // Redirect to a success page with a reference
    } catch (error) {
      return next(new ErrorHandler("Order not found:" + error, 404));
    }
  } else {
    return next(new ErrorHandler("Invalid Razorpay signature" + error, 400));
  }
});

exports.paymentApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
    secretKey: process.env.RAZORPAY_SECRET_KEY,
  });
});

exports.payentDataApi = catchAsyncError(async (req, res, next) => {
  const { paymentid } = req.params;
  const { Order_info, paymentUuid } = req.body;
  const order_info = JSON.parse(Order_info);

  const { taxPrice, totalPrice, uuid, coupon_uuid } = order_info;

 
  const { data } = await axios.get(
    `https://api.razorpay.com/v1/payments/${paymentid}`,
    {
      auth: {
        username: process.env.RAZORPAY_API_KEY,
        password: process.env.RAZORPAY_SECRET_KEY,
      },
    }
  );

  const patmentStatus = await OrdersPaymentsInfoModel.create({
    payment_info_uuid: paymentUuid,
    payment_info_amount: totalPrice,
    order_info_uuid: uuid,
    used_coupon_uuid: coupon_uuid,
    payment_type: "CARD",
    paynent_response: data,
    payment_info_tnx: taxPrice,
  });

  const OrderModel = await order_Model.findOne({ order_info_uuid: uuid });

  if (OrderModel) {
    OrderModel.order_info_status = "Processing";
    await OrderModel.save();
  }

  res.status(200).json({
    success: true,
    patmentStatus,
  });
});

//-------- order payment info

exports.payment_details_info = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const payment_info = await OrdersPaymentsInfoModel.findOne({
    order_info_uuid: id,
  });


  res.status(200).json({
    success: true,
    payment_info,
  });
});
