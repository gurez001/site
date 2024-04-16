import axios from "axios";
import {
  ALL_MASTER_COUPON_CLEAR,
  ALL_MASTER_COUPON_FAIL,
  ALL_MASTER_COUPON_REQUEST,
  ALL_MASTER_COUPON_SUCCESS,
  CREATE_MASTER_COUPON_FAIL,
  CREATE_MASTER_COUPON_REQUEST,
  CREATE_MASTER_COUPON_SUCCESS,
  SINGLE_MASTER_COUPON_FAIL,
  SINGLE_MASTER_COUPON_REQUEST,
  SINGLE_MASTER_COUPON_SUCCESS,
  UPDATE_MASTER_COUPON_FAIL,
  UPDATE_MASTER_COUPON_REQUEST,
  UPDATE_MASTER_COUPON_SUCCESS,
  VERIFY_MASTER_COUPON_FAIL,
  VERIFY_MASTER_COUPON_REQUEST,
  VERIFY_MASTER_COUPON_SUCCESS,
} from "../constants/MasterCouponConstant";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const CreateMasterCoupon =
  (inputValue, uuid, catIds, prodIds) => async (dispatch) => {
    const {
      allowFreeShipping,
      camount,
      couponExpiryDate,
      description,
      dtype,
      emails,
      excludeCategories,
      excludeProducts,
      excludeSaleItems,
      individualUseOnly,
      limitUsageToXItems,
      minimumSpend,
      name,
      maximumSpend,
      usageLimitPerCoupon,
      usageLimitPerUser,
    } = inputValue;
    try {
      dispatch({ type: CREATE_MASTER_COUPON_REQUEST });
      const formData = new FormData();
      formData.append("allowFreeShipping", allowFreeShipping);
      formData.append("camount", camount);
      formData.append("couponExpiryDate", couponExpiryDate);
      formData.append("description", description);
      formData.append("dtype", dtype);
      formData.append("emails", emails);
      formData.append("excludeCategories", excludeCategories);
      formData.append("excludeProducts", excludeProducts);
      formData.append("excludeSaleItems", excludeSaleItems);
      formData.append("individualUseOnly", individualUseOnly);
      formData.append("limitUsageToXItems", limitUsageToXItems);
      formData.append("minimumSpend", minimumSpend);
      formData.append("productCategories", catIds);
      formData.append("products", prodIds);
      formData.append("usageLimitPerCoupon", usageLimitPerCoupon);
      formData.append("usageLimitPerUser", usageLimitPerUser);
      formData.append("maximumSpend", maximumSpend);
      formData.append("name", name);
      formData.append("uuid", uuid);

      const { data } = await axios.post(
        `${server_url()}/api/v1/create/master-coupon`,
        formData,
        others_method()
      );
      dispatch({ type: CREATE_MASTER_COUPON_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_MASTER_COUPON_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const verifyMasterCoupon =
  (coupon, ids, subtotal) => async (dispatch) => {
    try {
      dispatch({ type: VERIFY_MASTER_COUPON_REQUEST });
      const formData = new FormData();
      formData.append("coupon", coupon);
      formData.append("ids", ids);
      formData.append("subtotal", subtotal);

      const { data } = await axios.post(
        `${server_url()}/api/v1/all-verify-coupon`,
        formData,
        others_method()
      );
      dispatch({ type: VERIFY_MASTER_COUPON_SUCCESS, payload: data.coupon });
    } catch (error) {
      dispatch({
        type: VERIFY_MASTER_COUPON_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MASTER_COUPON_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/all-master-coupon`,
      get_method()
    );
    dispatch({ type: ALL_MASTER_COUPON_SUCCESS, payload: data.allcoupon });
  } catch (error) {
    dispatch({
      type: ALL_MASTER_COUPON_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

//-------------SINGLE COUPON DATA----------

export const SingleCouponAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_MASTER_COUPON_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/single-master-coupon/${id}`,
      get_method()
    );
    dispatch({ type: SINGLE_MASTER_COUPON_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: SINGLE_MASTER_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

//--------UPDATE SINGLE COUPION DATA-------------

export const UpdateSingleCouponAction =
  (id, inputValue, catIds, prodIds) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_MASTER_COUPON_REQUEST });
      const formData = new FormData();
      for (let key in inputValue) {
        formData.append(key, inputValue[key]);
      }
      formData.append("productCategories", catIds);
      formData.append("products", prodIds);

      const { data } = await axios.put(
        `${server_url()}/api/v1/update-single-master-coupon/${id}`,
        formData,
        others_method()
      );
      dispatch({ type: UPDATE_MASTER_COUPON_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_MASTER_COUPON_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const coupon_clear_error = () => async (dispatch) => {
  dispatch({ type: ALL_MASTER_COUPON_CLEAR });
};
