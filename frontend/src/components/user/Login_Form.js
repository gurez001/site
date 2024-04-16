import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Loader from "../layout/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { ClearError, Login, Singup } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData/MetaData";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TextField,
  Button,
  Checkbox,
  Link,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";

const Login_Form = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, isAuthenticated, message, success, error } = useSelector(
    (state) => state.user
  );
  const Navigate = useNavigate();

  const [user_id, setuser_id] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user_id.trim() === "" || password.trim() === "") {
      alert.error("Email and password are required");
      return;
    }
    // if (!emailPattern.test(email)) {
    //   alert.error("Please enter a valid email address");
    //   return;
    // }
    if (password.trim().length < 3 || password.trim().length > 6) {
      alert.error("Password should be at least 6 characters long");
      return;
    }

    dispatch(Login(user_id, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isAuthenticated) {
      Navigate("/user-dashboard");
    }
    if (success) {
      alert.success(message);
    }
  }, [dispatch, error, alert, isAuthenticated, Navigate, success]);

  return (
    <>
      <MetaData title={"Sign In"} content={"Sign In"} keywords={"Sign In"} />

      <div className="custom-login-form" style={{ paddingBottom: 80 }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 550,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              padding: "30px 20px 30px",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="user_id"
                label="Email Address & Phone no"
                name="user_id"
                autoComplete="user_id"
                autoFocus
                value={user_id}
                onChange={(e) => setuser_id(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
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
                onClick={(e) => handleSignIn(e)}
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
                  "Sign In"
                )}
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link
                    style={{ cursor: "pointer" }}
                    variant="body2"
                    onClick={(e) => Navigate("/forget-password")}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ cursor: "pointer" }}
                    variant="body2"
                    onClick={(e) => Navigate("/sing-up")}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};
export default Login_Form;
