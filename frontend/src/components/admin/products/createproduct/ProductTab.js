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

const ProductTab = ({
    setProductType,
    setProduct_sale_price,
    setProduct_regular_price,
    setSKU,
    setStock,
    setSold_Individually,
    setAvailability_Date,
    setWeight,
    setDimensions,
    setShipping_class,
    setVariations,setDefault_value
  }) => {
    const [tabDataControl, setTabDataControl] = useState("Simple product");
    const [value, setValue] = useState(0);
    const [showAddNew, setShowAddNew] = useState(false);
    const [showlabel, setShowlabel] = useState(false);
    const [showAtt, setShowAtt] = useState("");
  
    const SelectTabControll = (tab) => {
      setTabDataControl(tab);
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const toggleAddNew = () => {
      setShowAddNew((prevState) => !prevState);
    };
  
    return (
      <>
        <div className="tab-containor form">
          <h2>
            Product data -
            <span>
              <select onBlur={(e)=>setProductType(e.target.value)} onChange={(e) => SelectTabControll(e.target.value)}>
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
              onChange={handleChange}
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
                setProduct_regular_price={setProduct_regular_price}
                setProduct_sale_price={setProduct_sale_price}
              
              />
            </TabPanel>
  
            <TabPanel value={value} index={1}>
              <Inventory
                setSKU={setSKU}
                setStock={setStock}
                setSold_Individually={setSold_Individually}
                setAvailability_Date={setAvailability_Date}
              
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Shippings
                setWeight={setWeight}
                setDimensions={setDimensions}
                Shipping_class={setShipping_class}
              
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
                setVariations={setVariations}
                setDefault_value={setDefault_value}
              />
            </TabPanel>
          </Box>
        </div>
      </>
    );
  }

export default ProductTab
