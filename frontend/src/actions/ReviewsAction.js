import axios from "axios";
import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  REVIEWS_CLEAR_ERROR,
} from "../constants/ReviewsConstant";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const createReview =
  (rating, comment, productId, product_uuid, uuid) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("comment", comment);
      formData.append("productId", productId);
      formData.append("product_uuid", product_uuid);
      formData.append("review_uuid", uuid);
     
      const { data } = await axios.put(
        `${server_url()}/api/v1/create/product-review`,
        formData,
        others_method()
      );
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllProductReview = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/review/product-review`,
     get_method()
    );
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const get_product_review_action =
  (currentPage = 1, id) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
      const { data } = await axios.get(
        `${server_url()}/api/v1/review/single/product-review?page=${currentPage}&product_uuid=${id}`,
        get_method()
      );
      console.log(data);
      dispatch({
        type: PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//---clear errors
export const reviewsClearError = () => async (dispatch) => {
  dispatch({ type: REVIEWS_CLEAR_ERROR });
};
