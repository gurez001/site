import {
  LOGIN_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  SINGUP_SUCCESS,
  SINGUP_FAIL,
  SINGUP_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGIN_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_DETAILS_FAIL,
  ALL_USER_DETAILS_REQUEST,
  ALL_USER_DETAILS_SUCCESS,
  ALL_USER_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  OTP_FAIL,
  OTP_SUCCESS,
  OTP_REQUEST,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  FORGET_PASSWORD_RESET,
  OTP_RESET,
  SINGUP_RESET,
  SINGUP_VALID,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAIL,
  RESEND_OTP_RESET,
} from "../constants/UserConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SINGUP_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SINGUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        success: true,
        user: action.payload.user_uuid,
        message: action.payload.message,
      };
    case SINGUP_VALID:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: false,
      };
    case SINGUP_RESET:
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        success: null,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGIN_FAIL:
    case SINGUP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        success: false,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const otp_Reducer = (state = {}, action) => {
  switch (action.type) {
    case OTP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESEND_OTP_REQUEST:
      return {
        ...state,
        resend_loading: true,
      };
    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        resend_loading: false,
        resend_success: true,
      };
    case OTP_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case RESEND_OTP_RESET:
      return {
        ...state,
        resend_loading: false,
        resend_success: null,
      };

    case OTP_FAIL:
    case RESEND_OTP_FAIL:
      return {
        ...state,
        loading: false,
        resend_loading: false,
        error: action.payload,
      };

    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        resend_loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const otpResendReducer = (state = { resendOtp: {} }, action) => {
  // switch (action.type) {
  //   case OTP_RESENDOTP_REQUEST:
  //     return {
  //       ...state,
  //       loading: true,
  //     };
  //   case OTP_RESENDOTP_SUCCESS:
  //     return {
  //       ...state,
  //       loading: false,
  //       success: true,
  //     };
  //   case OTP_RESENDOTP_FAIL:
  //     return {
  //       ...state,
  //       loading: false,
  //       success: false,
  //       error: action.payload,
  //     };
  //   case LOGIN_ERRORS:
  //     return {
  //       ...state,
  //       error: null,
  //     };
  //   default:
  //     return state;
  // }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

//----------------admin

export const allUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ALL_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case ALL_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const adminProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
        message: action.payload.message,
      };
    case UPDATE_USER_DETAILS_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_DETAILS_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload.user_uuid,
      };

    case FORGET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FORGET_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };

    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        data: null,
        error: action.payload,
      };
    case RESET_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        data: null,
      };

    case LOGIN_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
