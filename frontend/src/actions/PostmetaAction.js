import axios from "axios";
import {
    ALL_POST_META_FAIL,
    ALL_POST_META_REQUEST,
    ALL_POST_META_SUCCESS,
  } from "../constants/PostMetaConstant";
import { server_url } from "../utils/Url";
import { get_method } from "../utils/Headers";

export const getProductPostMeta = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_POST_META_REQUEST });
      const { data } = await axios.get(`${server_url()}/api/v1/post-meta/single-product-value/${id}`, get_method());
      dispatch({ type: ALL_POST_META_SUCCESS, payload: data.postMetaValue });
    } catch (err) {
      dispatch({ type: ALL_POST_META_FAIL, payload: err });
    }
  };