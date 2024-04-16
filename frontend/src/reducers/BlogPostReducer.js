import {
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_BLOG_FAILED,
  ALL_BLOG_CLEAR_ERROR,
  SINGLE_BLOGPAGE_REQUEST,
  SINGLE_BLOGPAGE_SUCCESS,
  SINGLE_BLOGPAGE_FAILED,
  SINGLE_BLOG_POST_FAILED,
  SINGLE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_SUCCESS,
  CREATE_BLOG_POST_FAILED,
  CREATE_BLOG_POST_RESET,
  UPDATE_BLOG_POST_RESET,
  UPDATE_BLOG_POST_FAILED,
  UPDATE_BLOG_POST_SUCCESS,
  UPDATE_BLOG_POST_REQUEST,
  DELETE_BLOG_POST_RESET,
  DELETE_BLOG_POST_FAILED,
  DELETE_BLOG_POST_SUCCESS,
  DELETE_BLOG_POST_REQUEST,
  ALL_BLOG_SEARCH_REQUEST,
  ALL_BLOG_SEARCH_SUCCESS,
  ALL_BLOG_SEARCH_FAIL,
} from "../constants/BlogPostConstants";

export const BlogPostReducer = (state = { blog: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blog: action.payload.blog,
        blogPostCount: action.payload.blogPostCount,
        resultPerpage: action.payload.resultPerpage,
      };

    case ALL_BLOG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_BLOG_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//---------single blog post

export const singleBlogPost = (state = { singleblog: [] }, action) => {
  switch (action.type) {
    case SINGLE_BLOG_POST_FAILED:
      return {
        ...state,
        loading: true,
      };
    case SINGLE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };
    case SINGLE_BLOG_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_BLOG_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//---------single blog post

export const createBlogPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_BLOG_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_BLOG_POST_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case ALL_BLOG_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// export const SingleBlogPageReducer = (state = { singleblog: [] }, action) => {
//   switch (action.type) {
//     case SINGLE_BLOGPAGE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };
//     case SINGLE_BLOGPAGE_SUCCESS:
//       return {
//         loading: false,
//         singleblog: action.payload,
//       };
//     case SINGLE_BLOGPAGE_FAILED:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     case ALL_BLOG_CLEAR_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };

// Delete blog post

export const DeletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BLOG_POST_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_BLOG_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_BLOG_POST_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: null,
      };
    default:
      return state;
  }
};

// Update blog post reducer

export const UpdateBlogPostReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BLOG_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BLOG_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case UPDATE_BLOG_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BLOG_POST_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    default:
      return state;
  }
};

export const BlogSearchReducer = (state = { blog: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_BLOG_SEARCH_SUCCESS:
      return {
        loading: false,
        blog: action.payload.blog,
      };

    case ALL_BLOG_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_BLOG_CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
