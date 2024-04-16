import {
  ALL_PRODUCT_ERRORS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  PRODUCCT_DETAILS_REQUEST,
  PRODUCCT_DETAILS_SUCCESS,
  PRODUCCT_DETAILS_FAIL,
  ALL_CAT_FAIL,
  ALL_CAT_REQUEST,
  ALL_CAT_SUCCESS,
  ALL_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  ALL_PRODUCT_RESET,
  ALL_PRODUCT_SEARCH_REQUEST,
  ALL_PRODUCT_SEARCH_SUCCESS,
  ALL_PRODUCT_SEARCH_FAIL,
  ALL_FEATURE_PRODUCT_REQUEST,
  ALL_FEATURE_PRODUCT_SUCCESS,
  ALL_FEATURE_PRODUCT_FAIL,
  PRODUCT_STATUS_REQUEST,
  PRODUCT_STATUS_SUCCESS,
  PRODUCT_STATUS_FAIL,
  PRODUCT_STATUS_RESET,
  CREATE_ATTRIBUTE_REQUEST,
  CREATE_ATTRIBUTE_SUCCESS,
  CREATE_ATTRIBUTE_FAIL,
  CREATE_ATTRIBUTE_RESET,
  GET_ATTRIBUTE_REQUEST,
  GET_ATTRIBUTE_SUCCESS,
  GET_ATTRIBUTE_FAIL,
  GET_ATTRIBUTE_RESET,
  GET_SINGLE_ATTRIBUTE_REQUEST,
  GET_SINGLE_ATTRIBUTE_SUCCESS,
  GET_SINGLE_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE_REQUEST,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE_RESET,
  CREATE_LABEL_REQUEST,
  CREATE_LABEL_SUCCESS,
  CREATE_LABEL_FAIL,
  CREATE_LABEL_RESET,
  GET_LABEL_REQUEST,
  GET_LABEL_SUCCESS,
  GET_LABEL_FAIL,
  GET_SINGLE_LABEL_REQUEST,
  GET_SINGLE_LABEL_SUCCESS,
  GET_SINGLE_LABEL_FAIL,
  UPDATE_LABEL_REQUEST,
  UPDATE_LABEL_RESET,
  UPDATE_LABEL_SUCCESS,
  UPDATE_LABEL_FAIL,
  DELETE_ATTRIBUTE_REQUEST,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAIL,
  DELETE_ATTRIBUTE_RESET,
  DELETE_LABEL_REQUEST,
  DELETE_LABEL_SUCCESS,
  DELETE_LABEL_FAIL,
  DELETE_LABEL_RESET,
  GET_ALL_LABEL_REQUEST,
  GET_ALL_LABEL_SUCCESS,
  GET_ALL_LABEL_FAIL,
} from "../constants/ProductConstants";

// export const productReducer = (state = { Products: [] }, action) => {
//   switch (action.type) {
//     case ALL_PRODUCT_REQUEST:
//       return {
//         loding: true,
//         product: [],
//       };
//     case ALL_PRODUCT_SUCCESS:
//       return {
//         loding: false,
//         products: action.payload.Products,
//         productsCount: action.payload.productCount,
//         resultPerPage: action.payload.resultPerpage,
//       };
//     case ALL_PRODUCT_FAIL:
//       return {
//         loding: false,
//         error: action.payload,
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

export const featureProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case ALL_FEATURE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_FEATURE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ALL_FEATURE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productReducer = (state = { Products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loding: true,
        product: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loding: false,
        products: action.payload.Products,
        newproducts: action.payload.newProducts,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerpage,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loding: false,
        products: action.payload,
      };
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loding: false,
        error: action.payload,
      };
    case ALL_PRODUCT_RESET:
      return {
        loding: false,
        products: null,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCCT_DETAILS_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case PRODUCCT_DETAILS_SUCCESS:
      return {
        ...state,
        loding: false,
        product: action.payload,
      };
    case PRODUCCT_DETAILS_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const CatReducer = (state = { Products: [] }, action) => {
  switch (action.type) {
    case ALL_CAT_REQUEST:
      return {
        loding: true,
        products: [],
      };
    case ALL_CAT_SUCCESS:
      return {
        loding: false,
        products: action.payload.Products,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerpage,
      };
    case ALL_CAT_FAIL:
      return {
        loding: false,
        error: action.payload,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loding: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
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

    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loding: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        loding: false,
        success: null,
      };

    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//--------admin

export const adminProductreducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: false,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//------------review

export const productsReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loding: false,
        product: action.payload,
      };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loding: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loding: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        loding: false,
        isDeleted: null,
      };

    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//---------Product Search reducer

export const productSearchReducer = (state = { Products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_SEARCH_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case ALL_PRODUCT_SEARCH_SUCCESS:
      return {
        loding: false,
        products: action.payload.Products,
      };
    case ALL_PRODUCT_SEARCH_FAIL:
      return {
        loding: false,
        error: action.payload,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateProductStatus = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdate: true,
      };
    case PRODUCT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_STATUS_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: null,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//---------product attribute reducer----------

export const ProductAttributeReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case CREATE_ATTRIBUTE_REQUEST:
    case GET_ATTRIBUTE_REQUEST:
    case GET_SINGLE_ATTRIBUTE_REQUEST:
    case UPDATE_ATTRIBUTE_REQUEST:
    case DELETE_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case UPDATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isupdate: true,
      };
    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    case GET_ATTRIBUTE_SUCCESS:
    case GET_SINGLE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case CREATE_ATTRIBUTE_FAIL:
    case GET_ATTRIBUTE_FAIL:
    case GET_SINGLE_ATTRIBUTE_FAIL:
    case UPDATE_ATTRIBUTE_FAIL:
    case DELETE_ATTRIBUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ATTRIBUTE_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };

    case UPDATE_ATTRIBUTE_RESET:
      return {
        ...state,
        loading: false,
        isupdate: null,
      };

    case DELETE_ATTRIBUTE_RESET:
      return {
        ...state,
        loading: false,
        isDelete: null,
      };

    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//-------------------label-------------------

export const ProductLabelReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case CREATE_LABEL_REQUEST:
    case GET_LABEL_REQUEST:
    case GET_SINGLE_LABEL_REQUEST:
    case UPDATE_LABEL_REQUEST:
    case DELETE_LABEL_REQUEST:
    case GET_ALL_LABEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDelete: true,
      };
    case UPDATE_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isupdate: true,
      };
    case GET_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ALL_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        labelData: action.payload,
      };
    case GET_SINGLE_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case CREATE_LABEL_FAIL:
    case GET_LABEL_FAIL:
    case GET_SINGLE_LABEL_FAIL:
    case UPDATE_LABEL_FAIL:
    case DELETE_LABEL_FAIL:
    case GET_ALL_LABEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_LABEL_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case DELETE_LABEL_RESET:
      return {
        ...state,
        loading: false,
        isDelete: null,
      };
    case UPDATE_LABEL_RESET:
      return {
        ...state,
        loading: false,
        isupdate: null,
      };
    case ALL_PRODUCT_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
