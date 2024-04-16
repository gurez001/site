import {
  ALL_POST_META_FAIL,
  ALL_POST_META_REQUEST,
  ALL_POST_META_SUCCESS,
} from "../constants/PostMetaConstant";

export const postMetaReducer = (state = { postmeta: {} }, action) => {
  switch (action.type) {
    case ALL_POST_META_REQUEST:
      return {
        loding: true,
      };
    case ALL_POST_META_SUCCESS:
      return {
        loding: false,
        postmeta: action.payload,
      };
    case ALL_POST_META_FAIL:
      return {
        loding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
