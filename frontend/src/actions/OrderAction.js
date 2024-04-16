import Cookies from "universal-cookie";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  All_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  ORDER_SHIPPING_INFO_REQUEST,
  ORDER_SHIPPING_INFO_SUCCESS,
  ORDER_SHIPPING_INFO_FAIL,
  ORDER_DETAILS_INFO_REQUEST,
  ORDER_DETAILS_INFO_SUCCESS,
  ORDER_DETAILS_INFO_FAIL,
  SHIPPING_ADDRESS_INFO_FAIL,
  SHIPPING_ADDRESS_INFO_SUCCESS,
  SHIPPING_ADDRESS_INFO_REQUEST,
  UPDATE_SHIPPING_ADDRESS_INFO_REQUEST,
  UPDATE_SHIPPING_ADDRESS_INFO_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_INFO_FAIL,
} from "../constants/OrderConstants";

import axios from "axios";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const createOrder =
  (order, payment_mode) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
      const order_details = JSON.stringify(order);
      const formData = new FormData();
      formData.append("order_details", order_details);
      formData.append("payment_mode", payment_mode);

      const data = await axios.post(
        `${server_url()}/api/v1/order/new`,
        formData,
        others_method()
      );

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data.Order });
    } catch (err) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getMyorders = (currentPage) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    let link = `${server_url()}/api/v1/orders/me?page=${currentPage}`;
    const { data } = await axios.get(link, get_method());

    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/order/${id}`,
      get_method()
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getAdminOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/admin/order/${id}`,
      get_method()
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//-----------------admin

export const getAllorders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/admin/orders`,
      get_method()
    );
    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: data.Orders,
    });
  } catch (err) {
    dispatch({
      type: All_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateOrder =
  (
    id,
    status,
    name,
    address,
    city,
    pinCode,
    country,
    state,
    email,
    phoneNo,
    productId,
    order_info_uuid
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
      const formData = new FormData();
      formData.append("status", status);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("pinCode", pinCode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("email", email);
      formData.append("phoneNo", phoneNo);
      formData.append("link", productId);
      formData.append("order_info_uuid", order_info_uuid);

      const { data } = await axios.put(
        `${server_url()}/api/v1/admin/order/${id}`,
        formData,
        others_method()
      );
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(
      `${server_url()}/api/v1/admin/order/${id}`,
      get_method()
    );
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const order_shipping_info = (id) => async (dispatch) => {
  try {
    const cookies = new Cookies(null, { path: "/" });
    console.log(cookies.get("token"));
    dispatch({ type: ORDER_SHIPPING_INFO_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/order/shipping-info/${id}`,
      get_method()
    );

    dispatch({ type: ORDER_SHIPPING_INFO_SUCCESS, payload: data.shipping });
  } catch (err) {
    dispatch({
      type: ORDER_SHIPPING_INFO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const order_details_info = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_INFO_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/order/order-details-info/${id}`,
      get_method()
    );
    dispatch({ type: ORDER_DETAILS_INFO_SUCCESS, payload: data.order_details });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_INFO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const shipping_address_info = () => async (dispatch) => {
  try {
    dispatch({ type: SHIPPING_ADDRESS_INFO_REQUEST });
    let link = `${server_url()}/api/v1/shipping-address-info`;
    const { data } = await axios.get(link, get_method());

    dispatch({
      type: SHIPPING_ADDRESS_INFO_SUCCESS,
      payload: data.address,
    });
  } catch (err) {
    dispatch({
      type: SHIPPING_ADDRESS_INFO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const update_shipping_address_info =
  (input_value) => async (dispatch) => {
    try {
      const formdata = new FormData();
      for (let key in input_value) {
        formdata.append(key, input_value[key]);
      }
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_INFO_REQUEST });
      let link = `${server_url()}/api/v1/update/shipping-address-info`;

      const { data } = await axios.post(link, formdata, others_method());

      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_INFO_SUCCESS,
        payload: data.address,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_INFO_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
