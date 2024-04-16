import {
  ADD_NEW_CONTACT_FAIL,
  ADD_NEW_CONTACT_REQUEST,
  ADD_NEW_CONTACT_RESET,
  ADD_NEW_CONTACT_SUCCESS,
  Clear_Error,
  GET_CONTACT_FAILED,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
} from "../constants/ContactConstant";

export const ContactReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case ADD_NEW_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADD_NEW_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_NEW_CONTACT_RESET:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case Clear_Error:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
