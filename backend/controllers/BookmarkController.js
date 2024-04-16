const Bookmark = require("../models/BookmarkModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createBookmark = catchAsyncError(async (req, res, next) => {
  
    const {
      wishlist_product_id,
      wishlist_product_uuid,
      wishlist_customization,
   
    } = req.body;
    const user=req.user._id; 
   
    
   
      const wishlist = await Bookmark.create({
          wishlist_product_id,
          wishlist_product_uuid,
         user,
          wishlist_customization,
        }
      );
      res.status(201).json({ success: true, wishlist });
      return;
    

 
});