import React, { useEffect, useState } from "react";
import { ClearError, userForgetPassword } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FORGET_PASSWORD_RESET } from "../../constants/UserConstants";
import CircularProgress from "@mui/material/CircularProgress";

import { TextField, Button, Typography, Container, Box } from "@mui/material";
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();
  const [user_id, setuser_id] = useState("");

  const { loading, success, error } = useSelector(
    (state) => state.forgetPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("Otp send successfuly");
      dispatch({ type: FORGET_PASSWORD_RESET });
      Navigate("/otp-verification");
    }
  }, [error, alert, dispatch, success, Navigate]);

  const user_idSubmit = (e) => {
    e.preventDefault();

    dispatch(userForgetPassword(user_id));
  };

  return (
    <>
      <div className="custom-login-form" style={{ paddingBottom: 80 }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: 5,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              sx={{
                margin: 5,
                textAlign: "center",
              }}
              component="p"
              variant="body1"
            >
              Lost your password? Please enter your Email or Phone no address.
              You will receive a link to create a new password via Email or
              Phone no.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                type="user_id"
                fullWidth
                id="user_id"
                label="Email & Phone no"
                name="user_id"
                autoComplete="user_id"
                autoFocus
                value={user_id}
                onChange={(e) => setuser_id(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading} // Disable button when loading
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "#fff",
                  backgroundColor: "#73c631",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#73c631",
                  },
                }}
                onClick={user_idSubmit}
                startIcon={!loading} // Show icon only when not loading
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
                  "RESET PASSWORD"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ForgetPassword;
