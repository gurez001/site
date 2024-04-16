import React, { useEffect, useMemo, useState, memo } from "react";
import {
  clearErrors,
  shipping_address_info,
  update_shipping_address_info,
} from "../../../actions/OrderAction";
import { State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_SHIPPING_ADDRESS_INFO_RESET } from "../../../constants/OrderConstants";

import {
  TextField,
  Button,
  Link,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

const Update_address = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, address, success, error } = useSelector(
    (state) => state.address
  );
  const [input_value, set_input_value] = useState({
    name: "",
    phone_no: "",
    country: "India",
    address: "",
    city: "",
    pin_code: "",
    state: "",
  });

  const change_input_handler = (e) => {
    const { name, value } = e.target;
    set_input_value({ ...input_value, [name]: value });
  };

  useMemo(() => {
    if (address) {
      set_input_value({
        name: address && address.fullName,
        phone_no: address && address.phoneNo,
        country: address && address.country,
        address: address && address.address,
        city: address && address.city,
        pin_code: address && address.pinCode,
        state: address && address.state,
      });
    }
  }, [address]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Updated successfully");
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_INFO_RESET });
    }
    dispatch(shipping_address_info());
  }, [dispatch, success, error, alert]);

  const submit_form = (e) => {
    e.preventDefault();
    dispatch(update_shipping_address_info(input_value));
  };

  return (
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
          Update Addresses
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
              padding: "30px 20px 30px",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="name"
                label="Full name"
                name="name"
                autoComplete="name"
                autoFocus
                value={input_value.name}
                onChange={(e) => change_input_handler(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="phone_no"
                label="Phone No"
                name="phone_no"
                autoComplete="phone_no"
                autoFocus
                value={input_value.phone_no}
                onChange={(e) => change_input_handler(e)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="address"
                multiline
                rows={2}
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                value={input_value.address}
                onChange={(e) => change_input_handler(e)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="country"
                select
                style={{ width: "50%", paddingRight: 5 }}
                label="Select"
                name="country"
                defaultValue="India"
                value={input_value.country}
                onChange={(e) => change_input_handler(e)}
                SelectProps={{
                  native: true,
                }}
              >
                {" "}
                <option value="Select one">Select one</option>
                <option value="India">India</option>
                <option value="Other">Other</option>
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="state"
                select
                style={{ width: "50%" }}
                label="Select"
                name="state"
                defaultValue="Select one"
                value={input_value.state}
                onChange={(e) => change_input_handler(e)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select state</option>
                {State &&
                  State.getStatesOfCountry("IN").map((item, i) => (
                    <option key={i} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                select
                label="City"
                style={{ width: "50%", paddingRight: 5 }}
                name="city"
                defaultValue="Select one"
                value={input_value.city}
                onChange={(e) => change_input_handler(e)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select state</option>
                {City &&
                  City.getCitiesOfState("IN", input_value.state).map((item, i) => (
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </TextField>

              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="pin_code"
                label="Pin Code"
                name="pin_code"
                style={{ width: "50%" }}
                autoFocus
                value={input_value.pin_code}
                onChange={(e) => change_input_handler(e)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
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
                onClick={submit_form}
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
                  "Update addresses"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default memo(Update_address);
