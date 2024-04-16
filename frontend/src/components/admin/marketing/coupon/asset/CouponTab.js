import * as React from "react";
import PropTypes from "prop-types";
import {Tabs,Typography,Tab,Box} from "@mui/material";
import Loader from "../../../../layout/loader/Loader";
import { useSelector } from "react-redux";

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

export default function VerticalTabs({
  inputValue,
  onchageInputValue,
  searchInput,
  searchHandle,
  handlerSearchDropdown,
  InputLength,
  productIds,
  removeItem,
  productcatHandle,
  handerProductCatDropdown,
  removeProductCatItem,
  productCatIds,
  productCatInputToggle,
}) {
  const [value, setValue] = React.useState(0);
  const { loading, products } = useSelector((state) => state.search);
  const { allcategroes } = useSelector((state) => state.allCategroe);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        <Tab label="General" {...a11yProps(0)} />
        <Tab label="Usqage Restriction" {...a11yProps(1)} />
        <Tab label="Usages limits" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Discount Type</label>
          </div>
          <div className="tab-right">
            <select
              name="dtype"
              value={inputValue.dtype}
              onChange={onchageInputValue}
            >
              <option className="xsm-font-size">Please Select</option>
              <option className="xsm-font-size" value="Percentage discount">
                Percentage discount
              </option>
              <option className="xsm-font-size" value="Fixed basket discount">
                Fixed basket discount
              </option>
              {/* <option value="Fixed product discount">
                Fixed product discount
              </option>
              <option value="Discount By User">Discount By User</option> */}
            </select>
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size" >Coupon Amount</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="camount"
              value={inputValue.camount}
              onChange={onchageInputValue}
            />
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Allow Free Shipping</label>
          </div>
          <div className="tab-right">
            <input
              type="checkbox"
              id="allowFreeShipping"
              name="allowFreeShipping"
              checked={inputValue.allowFreeShipping}
              onChange={onchageInputValue}
            />
            <span className="xsm-font-size">
              Tick this box if the coupon grants free shipping. A free shipping
              method must be enabled in your shipping zone and be set to require
              "a valid free shipping coupon" (see the "Free Shipping Requires"
              setting)
            </span>
          </div>
        </div>
        <div></div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Coupon expiry date</label>
          </div>
          <div className="tab-right">
            <input
              type="date"
              name="couponExpiryDate"
              value={inputValue.couponExpiryDate}
              onChange={onchageInputValue}
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Minimum spend</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="minimumSpend"
              value={inputValue.minimumSpend}
              onChange={onchageInputValue}
            />
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Maximum spend</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="maximumSpend"
              value={inputValue.maximumSpend}
              onChange={onchageInputValue}
            />
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Individual use only</label>
          </div>
          <div className="tab-right">
            <input
              type="checkbox"
              id="individualUseOnly"
              name="individualUseOnly"
              value={inputValue.individualUseOnly}
              onChange={onchageInputValue}
            />
            <span className="xsm-font-size">
              Tick this box if the coupon cannot be used in conjunction with
              other coupons.
            </span>
          </div>
        </div>
        <div></div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Exclude sale items</label>
          </div>
          <div className="tab-right">
            <input
              type="checkbox"
              id="excludeSaleItems"
              name="excludeSaleItems"
              value={inputValue.excludeSaleItems}
              onChange={onchageInputValue}
            />
            <span className="xsm-font-size">
              Tick this box if the coupon should not apply to items on sale.
              Per-item coupons will only work if the item is not on sale.
              Per-basket coupons will only work if there are items in the basket
              that are not on sale.
            </span>
          </div>
        </div>
        <div></div>

        {/* products  backend call */}

        <div className="tab-general">
          <div className="tab-left">
            <label>Products</label>
          </div>
          <div className="tab-right">
            {productIds.map((item, i) => (
              <div key={i}>
                <span onClick={(e) => removeItem(item._id)}>x</span>
                <span>{item.name}</span>
              </div>
            ))}
            <input
              type="search"
              name="search"
              value={searchInput}
              onChange={(e) => searchHandle(e)}
            />
            <div className="search-product">
              <ul className={InputLength ? "listcont" : ""}>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {InputLength ? (
                      products && products.length > 0 ? (
                        products.map((item, i) => (
                          <li
                            onClick={(e) => handlerSearchDropdown(item, i)}
                            key={i}
                          >
                            <p>{item.name}</p>
                          </li>
                        ))
                      ) : (
                        <li className="listcont-not-found xsm-font-size">
                          Product not found
                        </li>
                      )
                    ) : null}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Exclude Products</label>
          </div>
          <div className="tab-right">
            <input
              type="search"
              name="excludeProducts"
              value={inputValue.excludeProducts}
              onChange={onchageInputValue}
            />
          </div>
        </div>
        {/* products  backend call */}

        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Products Categories</label>
          </div>
          <div className="tab-right">
            <div>
              {productCatIds.map((item, i) => (
                <div key={i}>
                  <span onClick={(e) => removeProductCatItem(item._id)}>x</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <input
              type="search"
              name="productCategories"
              // value={inputValue.productCategories}
              onClick={productcatHandle}
            />
            <div>
              {productCatInputToggle ? (
                <ul>
                  {allcategroes &&
                    allcategroes
                      .filter((item) => item.categorystatus === true)
                      .map((item, i) => (
                        <li
                          key={i}
                          onClick={(e) => handerProductCatDropdown(item, i)}
                        >
                          {item.name}
                          <ul>
                            {item.childs
                              .filter((item) => item.subcategorystatus === true)
                              .map((subItem, j) => (
                                <li
                                  key={j}
                                  onClick={(e) =>
                                    handerProductCatDropdown(subItem, j)
                                  }
                                >
                                  {subItem.name}
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Exclude Categories</label>
          </div>
          <div className="tab-right">
            <input
              type="search"
              name="excludeCategories"
              value={inputValue.excludeCategories}
              onChange={onchageInputValue}
            />
          </div>
        </div>
        {/* Allowed email */}

        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Emails</label>
          </div>
          <div className="tab-right">
            <input
              type="email"
              name="emails"
              value={inputValue.emails}
              onChange={onchageInputValue}
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Usage limit per coupon</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="usageLimitPerCoupon"
              value={inputValue.usageLimitPerCoupon}
              onChange={onchageInputValue}
            />
          </div>
        </div>

        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Limit usage to X items</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="limitUsageToXItems"
              value={inputValue.limitUsageToXItems}
              onChange={onchageInputValue}
            />
          </div>
        </div>

        <div className="tab-general">
          <div className="tab-left">
            <label className="xsm-font-size">Usage limit per user</label>
          </div>
          <div className="tab-right">
            <input
              type="number"
              name="usageLimitPerUser"
              value={inputValue.usageLimitPerUser}
              onChange={onchageInputValue}
            />
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
