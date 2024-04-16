import {
  ADD_NEW_CONTACT_FAIL,
  ADD_NEW_CONTACT_REQUEST,
  ADD_NEW_CONTACT_SUCCESS,
  Clear_Error,
  GET_CONTACT_FAILED,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
} from "../constants/ContactConstant";
import axios from "axios";
import { server_url } from "../utils/Url";
import { get_method, others_method } from "../utils/Headers";

export const CreateContactAction = (inputValue) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_CONTACT_REQUEST });
    const formData = new FormData();
    for (let key in inputValue) {
      formData.append(key, inputValue[key]);
    }

    const { data } = await axios.post(
      `${server_url()}/api/v1/contact`,
      formData,
      others_method()
    );
    dispatch({ type: ADD_NEW_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_NEW_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//--------get contact details------------------

export const GetContactAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_REQUEST });
    const { data } = await axios.get(
      `${server_url()}/api/v1/get-contact`,
      get_method()
    );
    dispatch({ type: GET_CONTACT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: GET_CONTACT_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const ClearError = () => (dispatch) => {
  dispatch({ type: Clear_Error });
};
