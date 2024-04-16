const express=require("express");
const router=express.Router();
const {createBookmark}=require("../controllers/BookmarkController");
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/create-bookmark").post(isAuthenticatedUser,createBookmark);


module.exports=router