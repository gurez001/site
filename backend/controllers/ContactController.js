const Contact = require("../models/ContactModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.CreateContactDetails = catchAsyncError(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const data = await Contact.create({ name, email, subject, message });
  res.status(201).json({ success: true, data });
});

//-----------get contact details-------------

exports.GetContactDetails = catchAsyncError(async (req, res, next) => {
  const data = await Contact.find();
  res.status(201).json({ success: true, data });
});

// exports.SingleContactDetails = catchAsyncError(async (req, res, next) => {
//
//     const { id } = req.body;

//     const data = await Contact.findOne({_id:id});
//     res.status(201).json({ success: true, data });
//   } catch (error) {
//     return next(new ErrorHandler(`Internal server error: ${error}`, 500));
//   }
// });
