import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClearError, resetPassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_RESET } from "../../constants/UserConstants";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const ResetPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, isUpdated, message, error } = useSelector(
    (state) => state.resetPassword
  );
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success(message);
      Navigate("/registration");
      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [error, alert, isUpdated, dispatch, Navigate, message]);

  const resetSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password, Cpassword));
  };

  return (
    <div className="custom-login-form" style={{ paddingBottom: 80 }}>
      {/* <Typography
          sx={{
            margin: 5,
            textAlign: "center",
          }}
          component="p"
          variant="body1"
        >
          Lost your password? Please enter your username or email address. You
          will receive a link to create a new password via email.
        </Typography> */}
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              type="password"
              fullWidth
              id="password"
              label="New Password"
              name="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              type="password"
              fullWidth
              id="password"
              label="Confirm Password"
              name="Confirm Password"
              autoFocus
              value={Cpassword}
              onChange={(e) => setCPassword(e.target.value)}
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
              onClick={resetSubmit}
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
  );
};

export default ResetPassword;
