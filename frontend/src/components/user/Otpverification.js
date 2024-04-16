import React, { useEffect, useState } from "react";
import { ClearError, Otp_action, resend_Otp } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  OTP_RESET,
  RESEND_OTP_RESET,
  SINGUP_VALID,
} from "../../constants/UserConstants";
import MetaData from "../layout/metaData/MetaData";
import OtpInput from "react-otp-input";
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {  user:forget_user_uuid } = useSelector((state) => state.forgetPassword);

  const { loading, resend_loading, resend_success, error, success } =
    useSelector((state) => state.opt_data);

  // const {
  //   loading: resend_loading,
  //   success: resend_otp_success,
  //   error: resendOtpError,
  // } = useSelector((state) => state.resendOtp);

  const [otpInput, setOtpInput] = useState(null);
let uesr_uuid = user?user:forget_user_uuid;
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      dispatch({ type: OTP_RESET });
      dispatch({ type: SINGUP_VALID });
    }
    if (isAuthenticated) {
      navigate("/user-dashboard");
    }
    if (resend_success) {
      dispatch({ type: OTP_RESET });
      dispatch({ type: RESEND_OTP_RESET });
      alert.success("Otp send successfully");
    }
  }, [success, error, alert, dispatch, isAuthenticated, resend_success]);

  const otpSubmit = (e) => {
    e.preventDefault();

    dispatch(Otp_action(uesr_uuid && uesr_uuid, otpInput));
  };

  const userOtpResend = (e) => {
    e.preventDefault();
    dispatch(resend_Otp(uesr_uuid && uesr_uuid));
  };

  return (
    <>
      <MetaData
        title={"Otp Verification"}
        content={"Otp Verification"}
        keywords={"Otp Verification"}
      />
      <div
        className="custom-login-form otp-form-containor"
        style={{ paddingBottom: 80 }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 550,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              padding: "30px 20px 0",
            }}
          >
            {/* <Typography component="h1" variant="h5">
   
            </Typography> */}
            <OtpInput
              value={otpInput}
              onChange={setOtpInput}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 1,
                  color: "#fff",
                  backgroundColor: "#73c631",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#73c631",
                  },
                }}
                onClick={(e) => otpSubmit(e)}
                startIcon={!loading}
              >
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={24} color="inherit" />
                  </div>
                ) : (
                  "Submit OTP"
                )}
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={resend_loading}
                sx={{
                  mb: 3,
                  color: "#fff",
                  backgroundColor: "#73c631",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#73c631",
                  },
                }}
                onClick={(e) => userOtpResend(e)}
                startIcon={!resend_loading}
              >
                {resend_loading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={24} color="inherit" />
                  </div>
                ) : (
                  "Resend otp"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default OtpVerification;
