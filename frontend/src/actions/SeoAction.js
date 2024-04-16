import axios from "axios";
import {
  CREATE_SEO_FAIL,
  CREATE_SEO_REQUEST,
  CREATE_SEO_SUCCESS,
  SEO_CLEAR_SEO,
  SEO_FAIL,
  SEO_REQUEST,
  SEO_SUCCESS,
} from "../constants/SeoConstants";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const getAllSeo = () => async (dispatch) => {
  try {
    dispatch({ type: SEO_REQUEST });

    const { data } = await axios.get(
      `${server_url()}/api/v1/all-seo`,
      get_method()
    );
    dispatch({ type: SEO_SUCCESS, payload: data.seo });
  } catch (error) {
    dispatch({ type: SEO_FAIL, payload: error.response.data.message });
  }
};

export const create_seo =
  (input_value, product_uuid, uuid, seo_keywords) => async (dispatch) => {
    try {
      const keywords = JSON.stringify(seo_keywords);
      dispatch({ type: CREATE_SEO_REQUEST });
      const formdata = new FormData();
      for (let key in input_value) {
        formdata.append(key, input_value[key]);
      }
      formdata.append("product_uuid", product_uuid);
      formdata.append("uuid", uuid);
      formdata.append("keywords", keywords);

      const { data } = await axios.post(
        `${server_url()}/api/v1/create-seo`,
        formdata,
        others_method()
      );
      dispatch({ type: CREATE_SEO_SUCCESS, payload: data.seo });
    } catch (error) {
      dispatch({ type: CREATE_SEO_FAIL, payload: error.response.data.message });
    }
  };

export const seoClearError = () => async (dispatch) => {
  dispatch({ type: SEO_CLEAR_SEO });
};
