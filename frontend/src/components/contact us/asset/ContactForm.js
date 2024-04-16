import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import {
  TextField,
  Button,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  ClearError,
  CreateContactAction,
} from "../../../actions/ContactAction";
import { ADD_NEW_CONTACT_RESET } from "../../../constants/ContactConstant";

const ContactForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, success, error } = useSelector((state) => state.contact);
  const [inputValue, setinputValue] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleinputValue = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
  };
  const handlesubmitForm = (e) => {
    e.preventDefault();
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue.name.trim() === "") {
      alert.error("Please enter your name");
      return;
    }
    if (inputValue.email.trim() === "") {
      alert.error("Please enter your email address");
      return;
    }
    if (!emailPattern.test(inputValue.email)) {
      alert.error("Please enter a valid email address");
      return;
    }
    if (inputValue.subject.trim() === "") {
      alert.error("Please enter your subject");
      return;
    }
    if (inputValue.message.trim() === "") {
      alert.error("Please enter your message");
      return;
    }

    dispatch(CreateContactAction(inputValue));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("submit successfully");
      dispatch({ type: ADD_NEW_CONTACT_RESET });
      setinputValue({ name: "", email: "", subject: "", message: "" });
    }
  }, [dispatch, success, error]);

  return (
    <>
      <div className="custom-login-form" style={{ paddingBottom: 80 }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 550,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 0 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Your Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={inputValue.name}
                onChange={handleinputValue}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputValue.email}
                onChange={handleinputValue}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Your Subject"
                label="Your Subject"
                name="subject"
                autoComplete="subject"
                autoFocus
                value={inputValue.subject}
                onChange={handleinputValue}
              />
              <TextField
                margin="normal"
                required
                rows="4"
                fullWidth
                id="Message"
                label="Message"
                name="message"
                autoComplete="message"
                autoFocus
                value={inputValue.message}
                onChange={handleinputValue}
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
                onClick={(e) => handlesubmitForm(e)}
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
                  "Submit"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ContactForm;
