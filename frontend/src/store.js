import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  CatReducer,
  ProductAttributeReducer,
  ProductLabelReducer,
  adminProductreducer,
  createProductReducer,
  featureProductReducer,
  productDetailsReducer,
  productReducer,
  productSearchReducer,
  updateProductStatus,
} from "./reducers/ProductReducer";
import {
  adminProfileReducer,
  allUserReducer,
  forgetPasswordReducer,
  otpResendReducer,
  otp_Reducer,
  profileReducer,
  resetPasswordReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/UserReducer";
import { cartReducer } from "./reducers/CartReducer";
import {
  AllOredersReducer,
  OredersReducer,
  myOredersReducer,
  newOrederReducer,
  orderDetailsReducer,
  shipping_address_reducer,
} from "./reducers/OrderReducer";
import { paymentReducer } from "./reducers/PaymentReducer";
import {
  getAllImageReducer,
  imageTextUpdateReducer,
  imageUpdateReducer,
  imageUploadReducer,
  selectImageeReducer,
  updateImageSeoReducer,
} from "./reducers/imageGelleryReducer";
import { WishListReducer } from "./reducers/WiahListReducer";
import {
  SingleSubCategoryReducer,
  StatusCategoryReducer,
  UpdateSubCategoryReducer,
  getAllCategoriesReducer,
  categore_Reducer,
  singleCatReducer,
  updateParentCategoryReducer,
  sub_categore_Reducer,
  main_nav_categore_Reducer,
  sub_nav_categore_Reducer,
} from "./reducers/CategorieReducer";
import {
  BlogPostReducer,
  BlogSearchReducer,
  DeletePostReducer,
  SingleBlogPageReducer,
  UpdateBlogPostReducer,
  createBlogPostReducer,
  singleBlogPost,
} from "./reducers/BlogPostReducer";
import { BlogCommentReducer } from "./reducers/BlogCommentReducer";

import {
  BlogCategoryReducer,
  CreateBlogCategoryReducer,
  DeleteCategoryReducer,
  UpdateBlogCategoryReducer,
} from "./reducers/BlogCategoryReducer";
import { seoReducer } from "./reducers/SeoReducer";
import { massterCouponReducer } from "./reducers/MasterCouponReducer";
import { ContactReducer } from "./reducers/ContactReducer";
import { postMetaReducer } from "./reducers/PostMetaReducer";
import { reviewReducer } from "./reducers/ReviewsReducer";
import { Subscription_reducer } from "./reducers/Subscriptions_Reducer";

const reducer = combineReducers({
  nav_parent_category: main_nav_categore_Reducer,
  nav_sub_category: sub_nav_categore_Reducer,
  products: productReducer,
  productDetails: productDetailsReducer,
  catProducts: CatReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
  newOrder: newOrederReducer,
  myOrders: myOredersReducer,
  orderDetails: orderDetailsReducer,
  review: reviewReducer,
  newProduct: createProductReducer,
  adminProduct: adminProductreducer,
  allOrders: AllOredersReducer,
  adminOrders: OredersReducer,
  adminUsers: allUserReducer,
  adminUserDetails: userDetailsReducer,
  adminProfile: adminProfileReducer,
  search: productSearchReducer,
  payment: paymentReducer,
  images: getAllImageReducer,
  opt_data:otp_Reducer,
  // resendOtp: otpResendReducer,
  uploadImage: imageUploadReducer,
  updateImage: imageUpdateReducer,
  updateImageText: imageTextUpdateReducer,
  selectedImages: selectImageeReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
  wishList: WishListReducer,
  productFeature: featureProductReducer,
  Categore: categore_Reducer,
  sub_Categore: sub_categore_Reducer,
  allCategroe: getAllCategoriesReducer,
  allBlog: BlogPostReducer,
  singleBlogPage: singleBlogPost,
  allBlogCategore: BlogCategoryReducer,
  adminCreatePost: createBlogPostReducer,
  adminDeletePost: DeletePostReducer,
  adminUpdatePost: UpdateBlogPostReducer,
  adminCreateBlogCategory: CreateBlogCategoryReducer,
  adminDeleteBlogCategory: DeleteCategoryReducer,
  adminUpdateBlogCategory: UpdateBlogCategoryReducer,
  admin_seo: seoReducer,
  adminimageseo: updateImageSeoReducer,
  adminCategoryStatusUpdate: StatusCategoryReducer,
  adminSingleCategory: singleCatReducer,
  adminUpdateParentCategory: updateParentCategoryReducer,
  adminsingleSubCategory: SingleSubCategoryReducer,
  adminUpdateSubCategory: UpdateSubCategoryReducer,
  adminupdateproductstatus: updateProductStatus,
  mastercoupon: massterCouponReducer,
  blogsearch: BlogSearchReducer,
  adminCreateProductAttribute: ProductAttributeReducer,
  adminProductLabel: ProductLabelReducer,
  blogComment: BlogCommentReducer,
  contact: ContactReducer,
  postMeta: postMetaReducer,
  subscription:Subscription_reducer,
  address:shipping_address_reducer
});

let inialState = {
  cart: {
    cartItem: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippinginfo: localStorage.getItem("shippinginfo")
      ? JSON.parse(localStorage.getItem("shippinginfo"))
      : {},
  },

  wishList: {
    wishL: localStorage.getItem("wishListItems")
      ? JSON.parse(localStorage.getItem("wishListItems"))
      : [],
  },

  // wish: {
  //   cartItem: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippinginfo")
  //     ? JSON.parse(localStorage.getItem("shippinginfo"))
  //     : {},
  // },
};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  inialState,
  // applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
