//------------review

import {
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  REVIEWS_CLEAR_ERROR,
} from "../constants/ReviewsConstant";

export const reviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
    case NEW_REVIEW_REQUEST:
    case PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loding: false,
        review: action.payload,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        loding: false,
        review: action.payload.review,
        review_length: action.payload.reviewLength,
        resultPerpage: action.payload.resultPerpage,
        review_average: action.payload.review_average,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loding: false,
        success: true,
        review: action.payload.review,
      };
    case ALL_REVIEW_FAIL:
    case NEW_REVIEW_FAIL:
    case PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        loding: false,
        success: null,
      };

    case REVIEWS_CLEAR_ERROR:
      return {
        ...state,
        loding: false,
        error: null,
      };

    default:
      return state;
  }
};

// export const productsReviewReducer = (state = { review: [] }, action) => {
//   switch (action.type) {
//     case ALL_REVIEW_REQUEST:
//       return {
//         ...state,
//         loding: true,
//       };
//     case ALL_REVIEW_SUCCESS:
//       return {
//         loding: false,
//         review: action.payload,
//       };
//     case ALL_REVIEW_FAIL:
//       return {
//         ...state,
//         loding: false,
//         error: action.payload,
//       };
//     case REVIEWS_CLEAR_ERROR:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

// export const reviewsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_REVIEW_REQUEST:
//       return {
//         ...state,
//         loding: true,
//       };
//     case DELETE_REVIEW_SUCCESS:
//       return {
//         loding: false,
//         isDeleted: action.payload,
//       };
//     case DELETE_PRODUCT_FAIL:
//       return {
//         ...state,
//         loding: false,
//         error: action.payload,
//       };

//     case DELETE_REVIEW_RESET:
//       return {
//         ...state,
//         loding: false,
//         isDeleted: null,
//       };

//     case ALL_PRODUCT_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
