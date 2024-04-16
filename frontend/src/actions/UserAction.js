import Cookies from "universal-cookie";
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
  UPDATE_PASSWORD_REQUEST,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_DETAILS_REQUEST,
  ALL_USER_DETAILS_SUCCESS,
  ALL_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  ALL_USER_FAIL,
  OTP_FAIL,
  OTP_SUCCESS,
  OTP_REQUEST,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAIL,
} from "../constants/UserConstants";

import axios from "axios";
import { server_url } from "../utils/Url";
import {
  get_method,
  others_method,
  others_multiform_method,
} from "../utils/Headers";

export const Login = (user_id, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(
      `${server_url()}/api/v1/auth/login`,
      { user_id, password },
      others_method()
    );
    const token = data.token;

    const cookies = new Cookies(null, { path: "/" });
    const options = {
      path: "/", // cookie path
    };

    cookies.set("token", token, options);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const Singup = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: SINGUP_REQUEST });

    const { data } = await axios.post(
      `${server_url()}/api/v1/auth/register`,
      { userDetails },
      others_method()
    );
    console.log(data);
    dispatch({ type: SINGUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SINGUP_FAIL, payload: error.response.data.message });
  }
};

export const Otp_action = (uuid, otp) => async (dispatch) => {
  try {
    dispatch({ type: OTP_REQUEST });

    const { data } = await axios.put(
      `${server_url()}/api/v1/auth/otp`,
      {
        uuid,
        otp,
      },
      others_method()
    );
    const token = data.token;

    const cookies = new Cookies(null, { path: "/" });
    const options = {
      path: "/", // cookie path
    };

    cookies.set("token", token, options);
    dispatch({ type: OTP_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: OTP_FAIL, payload: error.response.data.message });
  }
};
//----- user forget password

export const userForgetPassword = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const { data } = await axios.post(
      `${server_url()}/api/v1/auth/password/forgot`,
      { user_id },
      others_method()
    );

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
////---------------------------------------------

export const resetPassword =
  (token, newPassword, confirmpassword) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const { data } = await axios.put(
        `${server_url()}/api/v1/auth/password/reset/${token}`,
        { newPassword, confirmpassword },
        others_method()
      );
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//------------------user login rensend Otp

export const resend_Otp = (uuid) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_OTP_REQUEST });

    const { data } = await axios.get(
      `${server_url()}/api/v1/auth/resend-otp?user_uuid=${uuid}`,
      get_method()
    );
    dispatch({ type: RESEND_OTP_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: RESEND_OTP_FAIL,
      payload: err.response.data.message,
    });
  }
};

//LOAD user

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(
      `${server_url()}/api/v1/auth/profie`,
      get_method()
    );
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.User });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//LOAD Logout

export const LogoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server_url()}/api/v1/auth/logout`, get_method());
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

// updtae user profile

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
  try {
    console.log(avatar);
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar[0].file);

    const { data } = await axios.put(
      `${server_url()}/api/v1/auth/profile/update`,
      myForm,
      others_multiform_method()
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset password

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.put(
      `${server_url()}/api/v1/auth/password/update`,
      passwords,
      others_method()
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//---------------admin get all users

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/auth/admin/users`,
      get_method()
    );
    dispatch({
      type: ALL_USER_SUCCESS,
      payload: data.Users,
    });
  } catch (err) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

//---------------admin get all details

export const getUsersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/auth/admin/user/${id}`,
      get_method()
    );
    dispatch({
      type: ALL_USER_DETAILS_SUCCESS,
      payload: data.User,
    });
  } catch (err) {
    dispatch({
      type: ALL_USER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//------------------update user details
export const updateUserDetails = (id, detailsData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    const { data } = await axios.put(
      `${server_url()}/api/v1/auth/admin/user/${id}`,
      detailsData,
      others_method()
    );
    dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//------------------delete users
export const deleteuser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(
      `${server_url()}/api/v1/auth/admin/user/${id}`,
      get_method()
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//-- clear all errors

export const ClearError = () => async (dispatch) => {
  dispatch({ type: LOGIN_ERRORS });
};
