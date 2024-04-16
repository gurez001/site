import { UpdateBlogCategory } from "../actions/BlogCategoryAction";
import {
  BLOG_CATEGORY_REQUEST,
  BLOG_CATEGORY_SUCCESS,
  BLOG_CATEGORY_FAILED,
  CATEGORY_CLEAR_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
  DELETE_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_RESET,
} from "../constants/BlogCategoryConstant";
import { UPDATE_IMAGE_SUCCESS } from "../constants/imageGelleryCartConstants";

export const BlogCategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case BLOG_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BLOG_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case BLOG_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const CreateBlogCategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CATEGORY_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// delete category

export const DeleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    case DELETE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CATEGORY_RESET:
      return {
        ...state,
        loading: false,
        isDelete: null,
      };
    case CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// update blog reducer

export const UpdateBlogCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    case CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};