import React, { useState } from "react";
import MetaData from "../../../layout/metaData/MetaData";
import { Aside } from "../../aside/Aside";
import {
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import ImageUploader from "../../ImageGellery/uploadimage/ImageTabToggle";
import { getAllImages } from "../../../../actions/imageGelleryAction";
import { useDispatch } from "react-redux";

const Add_New_Banner = () => {
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleImageClickOpen = () => {
    setOpen(true);
    dispatch(getAllImages());
  };
  return (
    <>
      <MetaData title={"Banners"} keywords={"banner"} content={"banner"} />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <div className="row">
                <div className="col-md-6">
                  <div
                    className="custom-login-form"
                    style={{ paddingBottom: 80 }}
                  >
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
                            // value={input_value.name}
                            // onChange={(e) => change_input_handler(e)}
                          />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            id="limit"
                            label="Limit"
                            name="limit"
                            autoFocus
                            // value={input_value.phone_no}
                            // onChange={(e) => change_input_handler(e)}
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={checked ? "Active" : "Inactive"}
                            onChange={handleCheckboxChange}
                          />
                          <Button
                            className="spacer"
                            variant="outlined"
                            onClick={() => handleImageClickOpen()}
                          >
                            Add Thumbnail
                          </Button>
                          <ImageUploader
                            open={open}
                            close={() => setOpen(false)}
                          />
                          {/* <Button
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
                              Update addresses
                            // {/* )} 
                          </Button> */}
                        </Box>
                      </Box>
                    </Container>
                  </div>
                </div>
                <div className="col-md-6">safsdf</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_New_Banner;
