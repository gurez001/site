import {
  EMAIL_SUBSCRIPTION_FAIL,
  EMAIL_SUBSCRIPTION_REQUEST,
  EMAIL_SUBSCRIPTION_RESET,
  EMAIL_SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_ERROR,
} from "../constants/Subscription_Constant";

export const Subscription_reducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EMAIL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case EMAIL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EMAIL_SUBSCRIPTION_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case SUBSCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
