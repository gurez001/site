import axios from "axios";
import {
  ALL_CATEGORIE_ERRORS,
  ALL_CATEGORIE_FAIL,
  ALL_CATEGORIE_REQUEST,
  ALL_CATEGORIE_SUCCESS,
  ALL_SUB_CATEGORIE_FAIL,
  ALL_SUB_CATEGORIE_REQUEST,
  ALL_SUB_CATEGORIE_SUCCESS,
  GET_SINGLE_PRODUCT_CAT_FAIL,
  GET_SINGLE_PRODUCT_CAT_REQUEST,
  GET_SINGLE_PRODUCT_CAT_SUCCESS,
  MAIN_NAV_CATEGORIE_FAIL,
  MAIN_NAV_CATEGORIE_REQUEST,
  MAIN_NAV_CATEGORIE_SUCCESS,
  NEW_CATEGORIE_FAIL,
  NEW_CATEGORIE_REQUEST,
  NEW_CATEGORIE_SUCCESS,
  NEW_SUB_CATEGORIE_FAIL,
  NEW_SUB_CATEGORIE_REQUEST,
  NEW_SUB_CATEGORIE_SUCCESS,
  SINGLE_SUB_CATEGORIE_FAIL,
  SINGLE_SUB_CATEGORIE_REQUEST,
  SINGLE_SUB_CATEGORIE_SUCCESS,
  STATUS_CATEGORIE_FAIL,
  STATUS_CATEGORIE_REQUEST,
  STATUS_CATEGORIE_SUCCESS,
  STATUS_SUB_CATEGORIE_FAIL,
  STATUS_SUB_CATEGORIE_REQUEST,
  STATUS_SUB_CATEGORIE_SUCCESS,
  SUB_NAV_CATEGORIE_FAIL,
  SUB_NAV_CATEGORIE_REQUEST,
  SUB_NAV_CATEGORIE_SUCCESS,
  UPDATE_PARENT_CATEGORIE_FAIL,
  UPDATE_PARENT_CATEGORIE_REQUEST,
  UPDATE_PARENT_CATEGORIE_SUCCESS,
  UPDATE_SUB_CATEGORIE_FAIL,
  UPDATE_SUB_CATEGORIE_REQUEST,
  UPDATE_SUB_CATEGORIE_SUCCESS,
} from "../constants/CategoreConstants";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const nav_main_list = () => async (dispatch) => {
  try {
    dispatch({ type: MAIN_NAV_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/all-categore`,
      get_method()
    );

    dispatch({ type: MAIN_NAV_CATEGORIE_SUCCESS, payload: data.allCategores });
  } catch (error) {
    dispatch({
      type: MAIN_NAV_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

export const nav_sub_list = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_NAV_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/all-sub-categore`,
      get_method()
    );
    dispatch({ type: SUB_NAV_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUB_NAV_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

export const CreateNewCategore =
  (input_value, uuid, img_id) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });
      const formData = new FormData();
      for (let key in input_value) {
        formData.append(key, input_value[key]);
      }
      formData.append("uuid", uuid);
      formData.append("img_id", img_id);

      const { data } = await axios.post(
        `${server_url()}/api/v1/create/categore`,
        formData,
        others_method()
      );

      dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const create_new_sub_categore =
  (input_value, uuid, img_id) => async (dispatch) => {
    try {
      dispatch({ type: NEW_SUB_CATEGORIE_REQUEST });
      const formData = new FormData();
      for (let key in input_value) {
        formData.append(key, input_value[key]);
      }
      formData.append("uuid", uuid);
      formData.append("img_id", img_id);

      const { data } = await axios.post(
        `${server_url()}/api/v1/create/sub-categore`,
        formData,
        others_method()
      );

      dispatch({ type: NEW_SUB_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_SUB_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/all-categore`,
      get_method()
    );
    dispatch({ type: ALL_CATEGORIE_SUCCESS, payload: data.allCategores });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

export const get_all_sub_categories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SUB_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/all-sub-categore`,
      get_method()
    );
    dispatch({ type: ALL_SUB_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_SUB_CATEGORIE_FAIL,
      payload: error.response.data.message || "Some error occurred",
    });
  }
};

//--------------------------- sub cat

export const CreateNewSubCategore =
  (name, slug, title, parent, description) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORIE_REQUEST });
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("title", title);
      formData.append("parent", parent);
      formData.append("description", description);

      const { data } = await axios.post(
        `${server_url()}/api/v1/create/sub-categore`,
        formData,
        others_method()
      );
      dispatch({ type: NEW_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_CATEGORIE_FAIL,
        payload: error.response.data.message || "Some error occurred",
      });
    }
  };

// ------STATUS--------------

export const StausCategory = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_CATEGORIE_REQUEST });

    const formdata = new FormData();
    formdata.append("status", status);

    const { data } = axios.put(
      `${server_url()}/api/v1/update/category-status/${id}`,
      formdata,
      others_method()
    );
    dispatch({ type: STATUS_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATUS_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const StausSubCategory = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_SUB_CATEGORIE_REQUEST });
    const formdata = new FormData();
    formdata.append("status", status);

    const { data } = axios.put(
      `${server_url()}/api/v1/update/sub-category-status/${id}`,
      formdata,
      others_method()
    );
    dispatch({ type: STATUS_SUB_CATEGORIE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STATUS_SUB_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleParentCat = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_CAT_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/product/all-parent-category/${id}`,
      get_method()
    );
    dispatch({
      type: GET_SINGLE_PRODUCT_CAT_SUCCESS,
      payload: data.parentcategory,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_CAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateParentCategory =
  (
    id,
    name,
    slug,
    title,
    description,
    parent,
    seotitle,
    keyword,
    metadec,
    metalink
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PARENT_CATEGORIE_REQUEST });
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("slug", slug);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("parent", parent);
      formdata.append("seotitle", seotitle);
      formdata.append("keyword", keyword);
      formdata.append("metadec", metadec);
      formdata.append("metalink", metalink);

      const { data } = axios.put(
        `${server_url()}/api/v1/update/parent-category/${id}`,
        formdata,
        others_method()
      );
      dispatch({ type: UPDATE_PARENT_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PARENT_CATEGORIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//----------------single Sub Categoryp---------------------------

export const SingleSubCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_SUB_CATEGORIE_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/product/all-sub-category/${id}`,
      get_method()
    );
    dispatch({ type: SINGLE_SUB_CATEGORIE_SUCCESS, payload: data.subcategory });
  } catch (error) {
    dispatch({
      type: SINGLE_SUB_CATEGORIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-----------UPDATE SUB CATEGORY------------------

export const UpdateSubCategoryAction =
  (
    id,
    name,
    slug,
    parent,
    title,
    description,
    seotitle,
    keyword,
    metadec,
    metalink,
    productsubcatid
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SUB_CATEGORIE_REQUEST });
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("slug", slug);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("parent", parent);
      formdata.append("seotitle", seotitle);
      formdata.append("keyword", keyword);
      formdata.append("metadec", metadec);
      formdata.append("metalink", metalink);
      formdata.append("productsubcatid", productsubcatid);

      const { data } = await axios.put(
        `${server_url()}/api/v1//update/sub-category/${id}`,
        formdata,
        others_method()
      );
      dispatch({ type: UPDATE_SUB_CATEGORIE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SUB_CATEGORIE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: ALL_CATEGORIE_ERRORS });
};
