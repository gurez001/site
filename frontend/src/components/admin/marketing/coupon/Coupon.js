import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import CouponForm from "./asset/CouponForm";
import "./coupon.css";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { CreateMasterCoupon } from "../../../../actions/MasterCouponAction";
import { ClearError, searchProduct } from "../../../../actions/ProductAction";
import { NavLink, useNavigate } from "react-router-dom";
import { CREATE_MASTER_COUPON_RESET } from "../../../../constants/MasterCouponConstant";

const Coupon = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { error } = useSelector((state) => state.search);
  const { success } = useSelector((state) => state.mastercoupon);
  const [searchInput, setSearchInput] = useState({ search: "" });
  const [InputLength, setInputLength] = useState(false);
  const [productIds, setProductIds] = useState([]);
  const [productCatIds, setProductCatIds] = useState([]);
  const [productCatInputToggle, setProductCatInputToggle] = useState(false);

  const [uuid, setuuid] = useState("");

  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    dtype: "",
    camount: "",
    allowFreeShipping: false,
    couponExpiryDate: "",
    minimumSpend: 0,
    maximumSpend: 0,
    individualUseOnly: false,
    excludeSaleItems: false,
    excludeProducts: "",
    excludeCategories: "",
    emails: "",
    usageLimitPerCoupon: 0,
    limitUsageToXItems: 0,
    usageLimitPerUser: 0,
  });

  const onchageInputValue = (e) => {
    const { name, value, type, checked } = e.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const catIds = productCatIds.map((item) => item._id);
    const prodIds = productIds.map((item) => Number(item._id));

    dispatch(CreateMasterCoupon(inputValue, uuid, catIds, prodIds));
  };

  //---------search product
  const searchHandle = (e) => {
    if (e.target.value.length >= 1) {
      setInputLength(true);
    } else {
      setInputLength(false);
    }
    const { name, value } = e.target;
    setSearchInput({ ...searchInput, [name]: value });
  };

  const handerSearchDropdown = (id, i) => {
    setInputLength(false);
    setSearchInput("");
    setProductIds((prev) => {
      const isIdPresent = prev.some((item) => item._id === id._id);

      if (!isIdPresent) {
        return [...prev, id];
      } else {
        const updatedIds = prev.filter((item) => item._id !== id._id);

        return [...updatedIds, id];
      }
    });
  };
  const removeItem = (id) => {
    setProductIds((prev) => prev.filter((item) => item._id !== id));
  };

  //------ search product end

  //--------- product category
  const productcatHandle = (e) => {
    setProductCatInputToggle(!productCatInputToggle);
  };

  const handerProductCatDropdown = (id, i) => {
    setProductCatInputToggle(!productCatInputToggle);
    setProductCatIds((prev) => [...new Set([...prev, id])]);
  };
  const removeProductCatItem = (id) => {
    setProductCatIds((prev) => prev.filter((item) => item._id !== id));
  };

  //------ product category end

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      dispatch({ type: CREATE_MASTER_COUPON_RESET });
      Navigate("/admin/all-coupon");
    }
    if (InputLength) {
      const { search } = searchInput;
      dispatch(searchProduct(search));
    }
    const fullUuid = uuidv4();
    const truncatedUuid = fullUuid.slice(0, 12);
    setuuid(truncatedUuid);
  }, [alert, error, success, Navigate, dispatch, InputLength, searchInput]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-post">
                  <div className="all-post-heading">
                    <h1>
                      Coupons
                      <span>
                        <NavLink to="/admin/all-coupon">View All Coupon</NavLink>
                      </span>
                    </h1>

                    <div className="form-div">
                      <CouponForm
                        handleSubmit={handleSubmit}
                        onchageInputValue={onchageInputValue}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        //--- for product search input
                        searchInput={searchInput.search}
                        searchHandle={searchHandle}
                        handlerSearchDropdown={handerSearchDropdown}
                        InputLength={InputLength}
                        productIds={productIds}
                        removeItem={removeItem}
                        //--product cat
                        productcatHandle={productcatHandle}
                        handerProductCatDropdown={handerProductCatDropdown}
                        removeProductCatItem={removeProductCatItem}
                        productCatIds={productCatIds}
                        productCatInputToggle={productCatInputToggle}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
