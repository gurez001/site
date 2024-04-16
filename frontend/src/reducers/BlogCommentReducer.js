import { ClearError } from "../actions/BlogCommentAction";
import {
  COMMENT_CLEAR_ERROR,
  CREATE_BLOG_COMMENT_FAILED,
  CREATE_BLOG_COMMENT_REQUEST,
  CREATE_BLOG_COMMENT_RESET,
  CREATE_BLOG_COMMENT_SUCCESS,
  GET_BLOG_COMMENT_FAILED,
  GET_BLOG_COMMENT_REQUEST,
  GET_BLOG_COMMENT_SUCCESS,
} from "../constants/BlogCommentConstant";
import Loader from "../components/layout/loader/Loader";

export const BlogCommentReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case CREATE_BLOG_COMMENT_REQUEST:
    case GET_BLOG_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BLOG_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case GET_BLOG_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case CREATE_BLOG_COMMENT_FAILED:
    case GET_BLOG_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BLOG_COMMENT_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case COMMENT_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};