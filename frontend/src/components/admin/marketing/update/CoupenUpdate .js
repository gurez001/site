import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import CouponForm from "../coupon/asset/CouponForm";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  SingleCouponAction,
  UpdateSingleCouponAction,
  coupon_clear_error,
} from "../../../../actions/MasterCouponAction";

const CoupenUpdate = () => {
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
  const { id } = useParams();

  const {
    loading,
    singleCoupon,
    error: singleerror,
  } = useSelector((state) => state.mastercoupon);

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
    dispatch(UpdateSingleCouponAction(id, inputValue, catIds, prodIds));
    //   dispatch(CreateMasterCoupon(inputValue, uuid, catIds, prodIds));
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

  useMemo(() => {
    dispatch(SingleCouponAction(id));
  }, []);

  useEffect(() => {
    if (singleerror) {
      alert.error(error);
      dispatch(coupon_clear_error());
    }
    if (singleCoupon) {
      setInputValue({
        name: singleCoupon && singleCoupon.master_coupon_name,
        description: singleCoupon && singleCoupon.master_coupon_desc,
        dtype: singleCoupon && singleCoupon.master_coupon_type,
        camount: singleCoupon && singleCoupon.master_coupon_amount,
        allowFreeShipping: false,
        couponExpiryDate: singleCoupon && singleCoupon.master_coupon_end_date,
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
    }
  }, [alert, dispatch, error, singleCoupon]);

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
                        <NavLink to="/admin/all-coupon">
                          View All Coupon
                        </NavLink>
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

export default CoupenUpdate;
