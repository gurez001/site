const catchAsyncError = require("../middleware/catchAsyncError");
const CountModel = require("../models/CountModel");
const OrdersPaymentsInfoModel = require("../models/OrdersPaymentsInfoModel");
const orderDetailsMode = require("../models/orderDetailsMode");
const axios = require("axios");
const order = require("../models/orderModels");
const orderShippingInfoModel = require("../models/orderShippingInfoModel");
const product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const { sendOrderEmail, sendOrderStatusEmail } = require("../utils/sendEmail");
const MasrterCouponModel = require("../models/MasrterCouponModel");

//------create new order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { order_details, payment_mode } = req.body;
  const count = await CountModel.findOne({ entityName: "User" });
  const order_info = JSON.parse(order_details);

  const {
    shippinginfo,
    orderItem,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    uuid,
    coupon_uuid,
    coupon_code,
    coupon_discounttype,
    coupon_discount,
    totalQuantity,
  } = order_info;

  const Order = await order.create({
    _id: count && count.count !== null ? count.orderCount : 1,
    order_info_uuid: uuid,
    order_info_total_price: totalPrice,
    order_info_total_order_quantity: totalQuantity,
    order_info_total_discount: coupon_discount,
    order_info_total_coupon_discount: coupon_discount,
    order_info_discount_type: coupon_discounttype,
    order_info_shipping_charges: shippingPrice,
    order_info_gst: taxPrice,
    master_coupon_uuid: coupon_uuid,
    master_coupon_code: coupon_code,
    order_info_grand_total: itemPrice + taxPrice + shippingPrice,
    user: req.user._id,
    order_info_status: payment_mode === "COD" ? "Proccessing" : "Failed",
    order_info_mode: payment_mode,
  });
  const shippingStatus = await orderShippingInfoModel.create({
    shipping_uuid: shippinginfo.shipping_uuid,
    fullName: shippinginfo.fullName,
    phoneNo: shippinginfo.phoneNo,
    email: shippinginfo.email,
    address: shippinginfo.address,
    country: shippinginfo.country,
    state: shippinginfo.state,
    city: shippinginfo.city,
    pinCode: shippinginfo.pinCode,
    order_info_uuid: Order.order_info_uuid,
    user: req.user._id,
  });
  // // const orderConfermation = {
  // //   shippingInfo: shippinginfo,
  // //   orderItem,
  // //   mode,
  // // };

  // // sendOrderEmail(orderConfermation);
  // //   order details
  // const product_uuid = [];
  // const product_id = [];
  // let product_Total_Price = 0;
  // let product_Total_Quantity = 0;

  // orderItem &&
  //   orderItem.forEach((item, i) => {
  //     product_uuid.push(item.product_uuid);
  //     product_id.push(item.productId);
  //     product_Total_Price += item.price * item.quantity;
  //     product_Total_Quantity += item.quantity;
  //   });

  for (let i = 0; i < orderItem.length; i++) {
    const order_Details_length = await orderDetailsMode.countDocuments();
    const orderDetails = await orderDetailsMode.create({
      order_detail_uuid: Order.order_info_uuid,
      order_detail_id: order_Details_length + 1,
      order_info_uuid: Order.order_info_uuid + i,
      product_Item: orderItem[i].productId,
      product_label: orderItem[i].label,
      product_uuid: orderItem[i].product_uuid,
      order_info_detail_price: orderItem[i].price,
      order_detail_quantity: orderItem[i].quantity,
      order_detail_created_date: Order.order_info_created_date,
      user: req.user._id,
    });
  }

  // const order_Details_length = await orderDetailsMode.countDocuments();
  // const orderDetails = await orderDetailsMode.create({
  //   order_detail_id: order_Details_length + 1,
  //   order_info_uuid: uuid,
  //   product_Items: orderItem,
  //   product_id: product_id,
  //   product_uuid: product_uuid,
  //   order_info_detail_price: product_Total_Price,
  //   order_detail_quantity: product_Total_Quantity,
  //   order_detail_created_date: Order.order_info_created_date,
  // });

  res.status(201).json({
    success: true,
    Order,
  });
});

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id).populate([
    { path: "user", model: "User" },
    // {path:'master_coupon_uuid',model:'masterCoupon'}
  ]);
  const user = Order.user._id;
  const all_order = await order.find();

  const all_user_orders = all_order.filter((item) => item.user === user);
  const Total_orders = all_user_orders.length;
  const Total_revenue = all_user_orders.reduce((acc, order) => {
    return acc + order.order_info_total_price;
  }, 0);

  if (!Order) {
    return next(new ErrorHandler("order not found with this is", 404));
  }
  res.status(201).json({
    success: true,
    Order,
    Total_orders,
    Total_revenue,
  });
});

exports.getAdminSingleOrder = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id).populate([
    { path: "user", model: "User" },
    // {path:'master_coupon_uuid',model:'masterCoupon'}
  ]);
  const user = Order.user._id;
  const all_order = await order.find();

  const all_user_orders = all_order.filter((item) => item.user === user);
  const Total_orders = all_user_orders.length;
  const Total_revenue = all_user_orders.reduce((acc, order) => {
    return acc + order.order_info_total_price;
  }, 0);

  if (!Order) {
    return next(new ErrorHandler("order not found with this is", 404));
  }
  res.status(201).json({
    success: true,
    Order,
    Total_orders,
    Total_revenue,
  });
});

// get logged in user order
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Parse the page number from query parameter, default to 1 if not provided
  const perPage = 6; // Number of orders per page
  const totalOrders = await order.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(totalOrders / perPage);
  const skip = (page - 1) * perPage;
  const Orders = await order
    .find({ user: req.user._id })
    .sort({ _id: -1 }) // Assuming you want to sort by the order ID in descending order
    .skip(skip)
    .limit(perPage);
  Orders.reverse();
  res.status(201).json({
    success: true,
    order_count: totalOrders,
    resultPerpage: perPage,
    Orders,
  });
});

// get all ordwers   ----------- admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const Orders = await order.find();
  let totalAmount = 0;
  let max = [];
  // Orders.forEach((order) => {
  //   totalAmount += order.totalPrice;
  //   order.orderItem.forEach((item) => {
  //     max.push(item.productId);
  //   });
  // });

  // const productFrequency = max.reduce((acc, productId) => {
  //   acc[productId] = (acc[productId] || 0) + 1;
  //   return acc;
  // }, {});

  Orders.reverse();
  res.status(201).json({
    success: true,
    // totalAmount,
    Orders,
    // productFrequency,
  });
});

// Update order status ----------- admin

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const {
    status,
    name,
    address,
    pinCode,
    city,
    country,
    state,
    email,
    phoneNo,
    link,
    order_info_uuid,
  } = req.body;

  const Order = await order.findById(req.params.id);
  const payment_info = await OrdersPaymentsInfoModel.findOne({
    order_info_uuid: Order.order_info_uuid,
  });

  if (!Order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  // if (Order.order_info_status === "Delivered") {
  //   return next(new ErrorHandler("We have already Delivered this order", 404));
  //   // Order.deliveredAt = Date.now();
  // }

  if (payment_info) {
    payment_info.payment_info_status = status;
    await payment_info.save({ validateBeforeSave: false });
  }

  Order.order_info_status = status;
  const shiiping_data = {
    fullName: name,
    phoneNo: phoneNo,
    email: email,
    address: address,
    country: country,
    state: state,
    city: city,
    pinCode: pinCode,
  };
  const shipping_info = await orderShippingInfoModel.findOneAndUpdate(
    { order_info_uuid: Order.order_info_uuid },
    shiiping_data,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  if (Order.order_info_status === "Shipped") {
    const orderS = {
      status: Order.order_info_status,

      text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
    };
    sendOrderStatusEmail(orderS);
  }
  if (Order.order_info_status === "Return") {
    const orderS = {
      status: Order.order_info_status,

      text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
    };
    sendOrderStatusEmail(orderS);
  }
  if (Order.order_info_status === "Cancle") {
    const orderS = {
      status: Order.order_info_status,

      text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
    };
    sendOrderStatusEmail(orderS);
  }

  if (Order.order_info_status === "Cancle") {
    const orderS = {
      status: Order.order_info_status,

      text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
    };
    sendOrderStatusEmail(orderS);
  }

  if (req.body.status === "Delivered") {
    const orderS = {
      status: Order.order_info_status,

      text: "Your order is currently being processed and will be shipped soon. You will receive a tracking number once it's shipped.",
    };
    sendOrderStatusEmail(orderS);
    Order.order_info_delivery_date = Date.now();
  }

  await Order.save({ validateBeforeSave: false });
  // await shipping_info.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    // Order,
  });
});

// async function updateStatus(id, quantity, productId) {
//   try {
//     for (let i = 0; i < id.length; i++) {
//       const prodId = id[i];
//       const quant = quantity[i];
//       const Product = await product.findOne({ "seo.metalink": prodId });

//       if (!Product) {
//         throw new Error(`Product not found for ID: ${prodId}`);
//       }

//       Product.stock -= quant;
//       await Product.save({ validateBeforeSave: false });
//     }
//   } catch (err) {
//     throw new Error(`Internal server error: ${err}`);
//   }
// }

// async function updateStock(id, quantity, status, productId) {
//   try {
//     for (let i = 0; i < id.length; i++) {
//       const prodId = id[i];
//       const quant = quantity[i];

//       const Product = await product.findOne({ "seo.metalink": prodId });
//       if (!Product) {
//         throw new Error(`Product not found for ID: ${prodId}`);
//       }
//       Product.stock += quant;
//       await Product.save({ validateBeforeSave: false });
//     }
//   } catch (err) {
//     throw new Error(`Internal server error: ${err}`);
//   }
// }

// Delete order   ----------- admin

exports.deleteOrders = catchAsyncError(async (req, res, next) => {
  const Order = await order.findById(req.params.id);
  if (!Order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await Order.deleteOne();
  res.status(201).json({
    success: true,
    message: "order-delete",
  });
});

//---------------------- shipping address

exports.shipping_info = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let shipping = await orderShippingInfoModel.findOne({ order_info_uuid: id });

  res.status(201).json({
    success: true,
    shipping,
  });
});

exports.order_details_info = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const order_details = await orderDetailsMode
    .find({
      order_detail_uuid: id,
    })
    .populate({ path: "product_Item", model: "Product" });
  res.status(200).json({
    success: true,
    order_details,
  });
});

//--------------------user
exports.get_shipping_info = catchAsyncError(async (req, res, next) => {
  const user = req.user._id;
  let address = await orderShippingInfoModel.findOne({ user });

  res.status(201).json({
    success: true,
    address,
  });
});

exports.update_shipping_info = catchAsyncError(async (req, res, next) => {
  const user = req.user._id;
  const { name, phone_no, country, address, city, pin_code, state } = req.body;
  const data = {
    fullName: name,
    phoneNo: phone_no,
    address: address,
    country: country,
    state: state,
    city: city,
    pinCode: pin_code,
  };
  let existingShippingInfo = await orderShippingInfoModel.findOne({ user });
  if (existingShippingInfo) {
    // If shipping info exists, update it
    existingShippingInfo = await orderShippingInfoModel.findOneAndUpdate(
      { user },
      data,
      { new: true } // To return the updated document
    );
  } else {
    // If shipping info doesn't exist, create a new one
    existingShippingInfo = await orderShippingInfoModel.create({
      user,
      ...data,
    });
  }

  res.status(201).json({
    success: true,
    address: existingShippingInfo,
  });
});
