import {
  PAYMENT_INFO_FAIL,
  PAYMENT_INFO_REQUEST,
  PAYMENT_INFO_RESET,
  PAYMENT_INFO_SUCCESS,
  CLEAR_ERRORS,
  PAYMENT_DATA_FAIL,
  PAYMENT_DATA_SUCCESS,
  PAYMENT_DATA_REQUEST,
  PAYMENT_DATA_RESET,
} from "../constants/PaymentConstants";

export const paymentReducer = (
  state = { paymentData: {}, payment_info: {} },
  action
) => {
  switch (action.type) {
    case PAYMENT_INFO_REQUEST:
    case PAYMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_INFO_SUCCESS:
      return {
        loading: false,
        payment_info: action.payload,
      };
    case PAYMENT_DATA_SUCCESS:
      return {
        loading: false,
        paymentData: action.payload,
      };
    case PAYMENT_INFO_FAIL:
    case PAYMENT_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PAYMENT_DATA_RESET:
      return {
        ...state,
        loading: false,
        paymentData: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
