import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import {
  email_subscription,
  subscription_Clear_Error,
} from "../../../../actions/Subscriptions_Action";
import generateUuid from "../../../../utils/Uuidv4";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { EMAIL_SUBSCRIPTION_RESET } from "../../../../constants/Subscription_Constant";
const NewsLetter = () => {
  const [inputValue, setInputValue] = useState("");
  const alert = useAlert();
  const { success, loading, error } = useSelector(
    (state) => state.subscription
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputValue || !emailPattern.test(inputValue)) {
      alert.error("Please enter a valid email address");
      return;
    }
    dispatch(email_subscription(inputValue, generateUuid()));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(subscription_Clear_Error());
    }
    if (success) {
      setInputValue("");
      dispatch({ type: EMAIL_SUBSCRIPTION_RESET });
      alert.success("Successfully Added");
    }
  }, [success, error, dispatch, alert]);

  return (
    <>
      <div className="foot-news-col">
        <div className="footer-logo">
          <img src="/Logo.png" alt="logo" />
        </div>
        <div className="newsletter-main">
          <h2>Subscribe to our Newsletter</h2>
          <p>Get all the latest information, Sales and Offers.</p>
        </div>
        <div className="footer-newsletter">
          <form className="footer-newaletter-form">
            <input
              type="email"
              id="news-email"
              placeholder="email address here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="button-success"
              disabled={loading}
              onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
