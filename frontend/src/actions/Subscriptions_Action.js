import axios from "axios";
import { server_url } from "../utils/Url";
import {
  EMAIL_SUBSCRIPTION_FAIL,
  EMAIL_SUBSCRIPTION_REQUEST,
  EMAIL_SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_ERROR,
} from "../constants/Subscription_Constant";
import { others_method } from "../utils/Headers";

export const email_subscription = (email, uuid) => async (dispatch) => {
  try {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("uuid", uuid);
    dispatch({ type: EMAIL_SUBSCRIPTION_REQUEST });
 
      const { data } = await axios.post(
        `${server_url()}/api/v1/email-subscription`,
        formdata,
        others_method()
      );

    dispatch({ type: EMAIL_SUBSCRIPTION_SUCCESS, payload: data.seo });
  } catch (error) {
    dispatch({
      type: EMAIL_SUBSCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const subscription_Clear_Error = () => async (dispatch) => {
  dispatch({ type: SUBSCRIPTION_ERROR });
};
