import * as React from "react";
import PropTypes from "prop-types";
import {Typography,Tab,Tabs,Box} from "@mui/material";
import Loader from "../../../layout/loader/Loader";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import General from "./assets/General";
import Inventory from "./assets/Inventory";
import Attributes from "./assets/Attributes";
import Shippings from "./assets/Shippings";
import Varitions from "./assets/Varitions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ProductTab = ({ inputValue, handleChange, handleSubmit, setDefault_value,   Variations,
  setVariations }) => {
  const type = inputValue.product_Type
  const [tabDataControl, setTabDataControl] = useState(type && type);
  const [value, setValue] = useState(0);
  const [showAddNew, setShowAddNew] = useState(false);
  const [showlabel, setShowlabel] = useState(false);
  const [showAtt, setShowAtt] = useState("");

  const SelectTabControll = (tab) => {
    setTabDataControl(tab);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleAddNew = () => {
    setShowAddNew((prevState) => !prevState);
  };


  React.useEffect(()=>{
    setTabDataControl(type);
  },[type])
  return (
    <>
      <div className="tab-containor">
        <h2>
          Product data -
          <span>
            <select
              name="product_Type"
              value={inputValue.product_Type}
              onChange={(e) => handleChange(e)}
            >
              <option value={"Simple product"}>Simple product </option>
              <option value={"Variable product"}>Variable product</option>
            </select>
          </span>
        </h2>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            // height: 270,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              key="general"
              disabled={tabDataControl !== "Simple product" ? true : false}
              label="General"
              {...a11yProps(0)}
            />
            <Tab key="inventory" label="Inventory" {...a11yProps(1)} />,
            <Tab key="shipping" label="Shipping" {...a11yProps(2)} />,
            <Tab
              key="attribute"
              disabled={tabDataControl !== "Variable product" ? true : false}
              label="Attribute"
              {...a11yProps(3)}
            />
            <Tab
              key="variations"
              disabled={tabDataControl !== "Variable product" ? true : false}
              label="Variations"
              {...a11yProps(4)}
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <General
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Inventory
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Shippings
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Attributes
              setShowAtt={setShowAtt}
              showAtt={showAtt}
              setShowlabel={setShowlabel}
            />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <Varitions
              Variations={Variations}
              setVariations={setVariations}
              setDefault_value={setDefault_value}
              inputValue={inputValue}
              inputValueChangeHandler={handleChange}
            />
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default ProductTab;
