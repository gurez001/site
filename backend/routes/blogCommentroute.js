const express=require("express");
const router=express.Router();
const {createcomment,getcomment} =require("../controllers/BlogCommentController");
const { isAuthenticatedUser, authorizeRols } = require("../middleware/auth");



router.route('/blog-comment').post(isAuthenticatedUser,createcomment);
router.route('/get-blog-comment').get(getcomment);


module.exports=router;