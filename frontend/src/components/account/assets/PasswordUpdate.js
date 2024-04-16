import React, { useEffect, useState } from "react";
import { ClearError, updatePassword } from "../../../actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/UserConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import MetaData from "../../layout/metaData/MetaData";

import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";

const PasswordUpdate = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updatePassFun = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updatePasswordBtn = (e) => {
    e.preventDefault();
    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      Navigate("/user-dashboard");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, Navigate]);

  return (
    <>
      <MetaData
        title={"Update Password"}
        content={"Update Password"}
        keywords={"Update Password"}
      />
      <section className="section-cont">
        <div
          style={{ maxWidth: "650px", margin: "0px auto" }}
          id="update-pass"
          className="cont-area-h"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="custom-login-form" style={{ paddingBottom: 80 }}>
                <Typography
                  sx={{
                    marginBottom: 5,
                    textAlign: "center",
                  }}
                  component="h1"
                  variant="h5"
                >
                  Update password
                </Typography>
                <Container maxWidth="sm">
                  <Box
                    sx={{
                      marginTop: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      maxWidth: 550,
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        type="password"
                        fullWidth
                        id="oldPassword"
                        label="Old password"
                        name="oldPassword"
                        autoComplete="oldPassword"
                        autoFocus
                        value={passwords.oldPassword}
                        onChange={updatePassFun}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="newPassword"
                        label="New password"
                        name="newPassword"
                        autoComplete="oldPassword"
                        autoFocus
                        value={passwords.newPassword}
                        onChange={updatePassFun}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="confirmPassword"
                        label="Confirm password"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        autoFocus
                        value={passwords.confirmPassword}
                        onChange={updatePassFun}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
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
                        onClick={(e) => updatePasswordBtn(e)}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PasswordUpdate;
