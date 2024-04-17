import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { Home } from "./components/home/Home";
import { Footer } from "./components/layout/footer/Footer";
import Shop from "./components/shop/Shop";
import ProductDetails from "./components/productDetails/ProductDetails";

import { useEffect, useState } from "react";
import store from "./store";
import { LoadUser } from "./actions/UserAction";
import Loader from "./components/layout/loader/Loader";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/account/assets/UpdateProfile";
import PasswordUpdate from "./components/account/assets/PasswordUpdate";
import Cart from "./components/cart/Cart";
import { Shipping } from "./components/shipping/Shipping";
import { ConfirmStep } from "./components/shipping/assets/ConfirmStep";
import ProccessPaymentStep from "./components/shipping/assets/ProccessPaymentStep";
import { OrderSuccess } from "./components/order/OrderSuccess";
import { OrderMe } from "./components/order/OrderMe";
import { OrderDetails } from "./components/order/assets/OrderDetails";
import { Dashboard } from "./components/admin/dashboard/Dashboard";
import { AllProducts } from "./components/admin/products/allproducts/AllProducts";
import { CreateProduct } from "./components/admin/products/createproduct/CreateProduct";
import UpdateProduct from "./components/admin/products/updateproduct/UpdateProduct";
import OrderList from "./components/admin/orders/orderlist/OrderList";
import { UpdateOrders } from "./components/admin/orders/updateorders/UpdateOrders";
import { AllUsers } from "./components/admin/users/allusers/AllUsers";
import UpdateUser from "./components/admin/users/updateuser/UpdateUser";
import { Reviews } from "./components/admin/productreviews/reviews/Reviews";
import AllImages from "./components/admin/ImageGellery/allImages/AllImages";
import PrivacyPolicy from "./components/layout/PrivacyPolicy";
import TermsAndConditions from "./components/layout/TermsAndConditions";
import Otpverification from "./components/user/Otpverification";
import ErrorPage from "./components/404Page/ErrorPage";
import ErrorBoundary from "./utils/ErrorBoundary";
import ForgetPassword from "./components/user/ForgetPassword";
import ResetPassword from "./components/user/ResetPassword";
import WishList from "./components/wishlist/WishList";
import Category from "./components/shop/category/Category";
import ContactUs from "./components/contact us/ContactUs";
import Producttracking from "./components/tracking/Producttracking";
import Ordercancel from "./components/tracking/Ordercancel";
import CreatePost from "./components/admin/post/createpost/CreatePost";
import AllPost from "./components/admin/post/allpost/AllPost";

import PaymentDetails from "./components/admin/orders/updateorders/assets/PaymentDetails";
import AllCategory from "./components/admin/category/allCategory/AllCategory";
import UpdateCategory from "./components/admin/category/updateCtegory/UpdateCategory";
import BottomNav from "./components/layout/BottomNav/BottomNav";
import Editor from "./components/admin/editor/Editor";
import ImageUploader from "./components/admin/ImageGellery/uploadimage/ImageUploader";
import Blog from "./components/blog/allblog/Blog";
import SingleBlog from "./components/blog/singleblog/SingleBlog";
import UpdatePost from "./components/admin/post/update/UpdatePost";
import AllSeo from "./components/admin/seo/allseo/AllSeo";
import PostCategory from "./components/admin/post/category/PostCategory";
import UpdateSubCategory from "./components/admin/category/updateCtegory/UpdateSubCategory";
import Coupon from "./components/admin/marketing/coupon/Coupon";
import Attribute from "./components/admin/products/attribute/Attribute";
import ProductLabel from "./components/admin/products/attribute/label/ProductLabel";
import AllCoupon from "./components/admin/marketing/coupon/AllCoupon";
import BlogCategoryPage from "./components/blog/blogcategorypage/BlogCategoryPage";
import UpdateAttribute from "./components/admin/products/attribute/update/UpdateAttribute";
import UpdateAttributeLabel from "./components/admin/products/attribute/label/update/UpdateAttributeLabel";
import GetContactDetails from "./components/admin/contact/GetContactDetails";
import UserDashboard from "./components/account/UserDashboard";
import CouponUpdate from "./components/admin/marketing/update/CoupenUpdate ";
import SubCategory from "./components/shop/subcategory/SubCategory";
import Login_Form from "./components/user/Login_Form";
import SignUp_Form from "./components/user/SignUp_Form";
import Banners from "./components/admin/Home/banners/Banners";
import Add_New_Banner from "./components/admin/Home/banners/Add_New_Banner";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { loading } = useSelector((state) => state.user);
  const [pageLoad, SetLoad] = useState(true);

  useEffect(() => {
    store.dispatch(LoadUser());
    if (!loading) {
      SetLoad(false);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {pageLoad ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="page">
            <div className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login_Form />} />
                <Route path="/sing-up" element={<SignUp_Form />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/shop" element={<Shop />} />
                <Route
                  path="/user-dashboard"
                  element={<ProtectedRoute Component={UserDashboard} />}
                />
                <Route
                  path="/product-category/:category"
                  element={<Category />}
                />
                <Route
                  path="/admin/all-contact"
                  element={
                    <ProtectedRoute
                      isAdmin={true}
                      Component={GetContactDetails}
                    />
                  }
                />
                <Route
                  path="/product-category/:category/:subcategory"
                  element={<SubCategory />}
                />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/otp-verification" element={<Otpverification />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route
                  path="/forget-password/:token"
                  element={<ResetPassword />}
                />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/blog/category/:id"
                  element={<BlogCategoryPage />}
                />
                <Route path="/blog/:id" element={<SingleBlog />} />

                <Route
                  path="/product/:id"
                  element={
                    // <ErrorBoundary>
                    <ProductDetails />
                    // </ErrorBoundary>
                  }
                />

                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/editor" element={<Editor />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsAndConditions />}
                />

                {/* <Route path="/category/:id" element={<Dolls />} /> */}

                <Route
                  path="/account/me/update"
                  element={<ProtectedRoute Component={UpdateProfile} />}
                />
                <Route
                  path="/account/password/update"
                  element={<ProtectedRoute Component={PasswordUpdate} />}
                />
                <Route
                  path="/shipping"
                  element={<ProtectedRoute Component={Shipping} />}
                />
                <Route
                  path="/shipping/order/confirm"
                  element={<ProtectedRoute Component={ConfirmStep} />}
                />
                <Route
                  path="/*"
                  element={<ProtectedRoute Component={ErrorPage} />}
                />
                <Route
                  path="/404"
                  element={<ProtectedRoute Component={ErrorPage} />}
                />
                <Route
                  path="/order/success"
                  element={<ProtectedRoute Component={OrderSuccess} />}
                />
                <Route
                  path="/orders"
                  element={<ProtectedRoute Component={OrderMe} />}
                />

                <Route
                  path="/order/:id"
                  element={<ProtectedRoute Component={OrderDetails} />}
                />
                <Route
                  path="/order/:id/:trackingid"
                  element={<ProtectedRoute Component={Producttracking} />}
                />
                <Route
                  path="/order/ordercancel"
                  element={<ProtectedRoute Component={Ordercancel} />}
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute isAdmin={true} Component={Dashboard} />
                  }
                />
                <Route
                  path="/admin/post/update/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={UpdatePost} />
                  }
                />
                <Route
                  path="/admin/home/banner"
                  element={
                    <ProtectedRoute isAdmin={true} Component={Banners} />
                  }
                />
                <Route
                  path="/admin/home/add-banner"
                  element={
                    <ProtectedRoute isAdmin={true} Component={Add_New_Banner} />
                  }
                />
                <Route
                  path="/admin/all-seo"
                  element={<ProtectedRoute isAdmin={true} Component={AllSeo} />}
                />
                <Route
                  path="/admin/all-products"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllProducts} />
                  }
                />
                <Route
                  path="/admin/post/post-category"
                  element={
                    <ProtectedRoute isAdmin={true} Component={PostCategory} />
                  }
                />

                <Route
                  path="/admin/post/all-post"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllPost} />
                  }
                />
                <Route
                  path="/admin/post/add-new-post"
                  element={
                    <ProtectedRoute isAdmin={true} Component={CreatePost} />
                  }
                />

                <Route
                  path="/admin/create-product"
                  element={
                    <ProtectedRoute isAdmin={true} Component={CreateProduct} />
                  }
                />

                <Route
                  path="/admin/product-label/:attribute/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={ProductLabel} />
                  }
                />

                <Route
                  path="/admin/product-attribute"
                  element={
                    <ProtectedRoute isAdmin={true} Component={Attribute} />
                  }
                />
                <Route
                  path="/admin/update-attribute/:id"
                  element={
                    <ProtectedRoute
                      isAdmin={true}
                      Component={UpdateAttribute}
                    />
                  }
                />
                <Route
                  path="/admin/update-label/:id"
                  element={
                    <ProtectedRoute
                      isAdmin={true}
                      Component={UpdateAttributeLabel}
                    />
                  }
                />
                <Route
                  path="/admin/categorie"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllCategory} />
                  }
                />
                <Route
                  path="/admin/product/update-categorie/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={UpdateCategory} />
                  }
                />

                <Route
                  path="/admin/update-sub-categorie/:id"
                  element={
                    <ProtectedRoute
                      isAdmin={true}
                      Component={UpdateSubCategory}
                    />
                  }
                />

                <Route
                  path="/admin/update-product/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={UpdateProduct} />
                  }
                />

                <Route
                  path="/admin/all-coupon"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllCoupon} />
                  }
                />
                <Route
                  path="/admin/update-coupon/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={CouponUpdate} />
                  }
                />

                <Route
                  path="/admin/coupon"
                  element={<ProtectedRoute isAdmin={true} Component={Coupon} />}
                />

                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute isAdmin={true} Component={OrderList} />
                  }
                />

                <Route
                  path="/admin/update-orders/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={UpdateOrders} />
                  }
                />
                <Route
                  path="/admin/update-orders/:id/:paymentid"
                  element={
                    <ProtectedRoute isAdmin={true} Component={PaymentDetails} />
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllUsers} />
                  }
                />
                <Route
                  path="/admin/user-update/:id"
                  element={
                    <ProtectedRoute isAdmin={true} Component={UpdateUser} />
                  }
                />
                <Route
                  path="/admin/reviews"
                  element={
                    <ProtectedRoute isAdmin={true} Component={Reviews} />
                  }
                />
                <Route
                  path="/admin/upload/media-new"
                  element={
                    <ProtectedRoute isAdmin={true} Component={ImageUploader} />
                  }
                />
                <Route
                  path="/admin/upload/library"
                  element={
                    <ProtectedRoute isAdmin={true} Component={AllImages} />
                  }
                />
                <Route path="/cart" element={<Cart />} />
                {/* <Route
                  path="/shipping/proccess/payment"
                  element={
                    <ProtectedRoute Component={ProccessPaymentStep} />
                  }
                /> */}

                <Route
                  path="/shipping/proccess/payment"
                  element={<ProtectedRoute Component={ProccessPaymentStep} />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
          {/* <BottomNav /> */}
        </>
      )}
    </Router>
  );
}

export default App;
