import {
  ALL_MASTER_COUPON_CLEAR,
  ALL_MASTER_COUPON_FAIL,
  ALL_MASTER_COUPON_REQUEST,
  ALL_MASTER_COUPON_SUCCESS,
  CREATE_MASTER_COUPON_FAIL,
  CREATE_MASTER_COUPON_REQUEST,
  CREATE_MASTER_COUPON_RESET,
  CREATE_MASTER_COUPON_SUCCESS,
  SINGLE_MASTER_COUPON_FAIL,
  SINGLE_MASTER_COUPON_REQUEST,
  SINGLE_MASTER_COUPON_SUCCESS,
  UPDATE_MASTER_COUPON_FAIL,
  UPDATE_MASTER_COUPON_REQUEST,
  UPDATE_MASTER_COUPON_RESET,
  UPDATE_MASTER_COUPON_SUCCESS,
  VERIFY_MASTER_COUPON_FAIL,
  VERIFY_MASTER_COUPON_REQUEST,
  VERIFY_MASTER_COUPON_RESET,
  VERIFY_MASTER_COUPON_SUCCESS,
} from "../constants/MasterCouponConstant";

export const massterCouponReducer = (
  state = { Coupons: [], coupon_data: {} },
  action
) => {
  switch (action.type) {
    case CREATE_MASTER_COUPON_REQUEST:
    case VERIFY_MASTER_COUPON_REQUEST:
    case ALL_MASTER_COUPON_REQUEST:
      case SINGLE_MASTER_COUPON_REQUEST :
        case UPDATE_MASTER_COUPON_REQUEST :
      return {
        ...state,
        loading: true,
      };

    case CREATE_MASTER_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      };
    case ALL_MASTER_COUPON_SUCCESS:
      return { ...state, loading: false, coupon: action.payload };
    case VERIFY_MASTER_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        coupon_data: action.payload,
        error: null,
      };
case SINGLE_MASTER_COUPON_SUCCESS :
  return{
    ...state,
    loading:false,
    singleCoupon:action.payload
  }
  case UPDATE_MASTER_COUPON_SUCCESS :
    return{
      ...state,
      loading:false,
      isupdate:action.payload
    }
    case CREATE_MASTER_COUPON_FAIL:
    case VERIFY_MASTER_COUPON_FAIL:
    case ALL_MASTER_COUPON_FAIL: 
    case SINGLE_MASTER_COUPON_FAIL :
      case UPDATE_MASTER_COUPON_FAIL :
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        coupon_data: null,
        singleCoupon:null,
        isupdate:null
      };

    case CREATE_MASTER_COUPON_RESET:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: null,
      };

    case VERIFY_MASTER_COUPON_RESET:
      return {
        ...state,
        loading: false,
        coupon_data: null,
      };
      case UPDATE_MASTER_COUPON_RESET :
        return{
          ...state,
          loading:false,
error:null
        }
    case ALL_MASTER_COUPON_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
