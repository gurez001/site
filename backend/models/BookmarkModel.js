const mongoose = require("mongoose");

const bookmarkSchena = mongoose.Schema({
      wishlist_product_id: {
        type: Number,
        ref: "Product",   
      },
      wishlist_product_uuid: {
        type: String,
      },
      user: {
        type: Number,
        ref: "User",
      },
      master_menu_item_uuid: {
        type: String,
      },
      wishlist_customization: {
        type: String,
      },
      wishlist_menu_item_created_date: {
        type: Date,
        default: Date.now,
      },
      wishlist_menu_item_updated_date: {
        type: Date,
        default: Date.now,
      },
      wishlist_menu_item_status: {
        type: Boolean,
        default: true,
      },
      wishlist_menu_item_is_deleted: {
        type: Boolean,
        default: false,
      },
    
 
});

module.exports = mongoose.model("Bookmark", bookmarkSchena);