import axios from "axios";
import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_BLOG_FAILED,
  ALL_BLOG_CLEAR_ERROR,
  SINGLE_BLOG_POST_REQUEST,
  SINGLE_BLOG_POST_SUCCESS,
  SINGLE_BLOG_POST_FAILED,
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILED,
  UPDATE_BLOG_POST_REQUEST,
  UPDATE_BLOG_POST_SUCCESS,
  UPDATE_BLOG_POST_FAILED,
  DELETE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_FAILED,
  ALL_BLOG_SEARCH_REQUEST,
  ALL_BLOG_SEARCH_SUCCESS,
  ALL_BLOG_SEARCH_FAIL,
} from "../constants/BlogPostConstants";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const searchBlog = (searchData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_SEARCH_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/blog/all-post?keyword=${searchData}`,
    get_method()
    );
    dispatch({ type: ALL_BLOG_SEARCH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ALL_BLOG_SEARCH_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const GetBlogPost =
  (currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_BLOG_REQUEST });
      let link = `${server_url()}/api/v1/blog/all-post?page=${currentPage}`;
      if (category) {
        link = `${server_url()}/api/v1/blog/all-post?page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link, get_method());
      dispatch({
        type: ALL_BLOG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAILED,
        payload: error.response.data.message,
      });
    }
  };

//-------------------------single post page

export const singleBlogPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BLOG_POST_REQUEST });
    const { data } = await axios.get(`${server_url()}/api/v1/blog/post/${id}`, get_method());
    dispatch({
      type: SINGLE_BLOG_POST_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOG_POST_FAILED,
      payload: error.response.data.message,
    });
  }
};

//-------------- create post

export const CreateBlogPost =
  (
    selectedCategoryId,
    title,
    description,
    slug,
    seotitle,
    keyword,
    metadec,
    metalink
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_BLOG_POST_REQUEST });
      const formData = new FormData();
      formData.append("category", selectedCategoryId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("slug", slug);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);
      formData.append("metalink", metalink);
    
      const { data } = await axios.post(
        `${server_url()}/api/v1/blog/add-new-post`,
        formData,
        others_method()
      );
      dispatch({
        type: CREATE_BLOG_POST_SUCCESS,
        payload: data.blog,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BLOG_POST_FAILED,
        payload: error.response.data.message,
      });
    }
  };

// Delete blog post

export const DeleteBlogPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_POST_REQUEST });
    const { data } = await axios.delete(
      `${server_url()}/api/v1/blog/delete-post/${id}`,
      get_method()
    );
    dispatch({
      type: DELETE_BLOG_POST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_POST_FAILED,
      error: error.response.data.message,
    });
  }
};

// UPDATE blog post

export const UpdateBlogPost =
  (
    title,
    selectedCategoryId,
    description,
    slug,
    id,
    seotitle,
    keyword,
    metadec,
    metalink
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BLOG_POST_REQUEST });
      const formData = new FormData();
      formData.append("category", selectedCategoryId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("slug", slug);
      formData.append("seotitle", seotitle);
      formData.append("keyword", keyword);
      formData.append("metadec", metadec);
      formData.append("metalink", metalink);
     
      const { data } = await axios.put(
        `${server_url()}/api/v1/blog/update-post/${id}`,
        formData,
        others_method()
      );
      dispatch({
        type: UPDATE_BLOG_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_BLOG_POST_FAILED,
        error: error.response.data.message,
      });
    }
  };

export const ClearError = () => async (dispatch) => {
  dispatch({ type: ALL_BLOG_CLEAR_ERROR });
};
