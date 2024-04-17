import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OrderMe } from "../order/OrderMe";
import { Shipping } from "../shipping/Shipping";
import ShippingDetails from "../order/assets/ShippingDetails";
import {
  getOrderDetails,
  order_shipping_info,
} from "../../actions/OrderAction";
import { get_payment_info } from "../../actions/Paymentaction";
import { LogoutUser } from "../../actions/UserAction";
import PasswordUpdate from "./assets/PasswordUpdate";
import { UpdateProfile } from "./assets/UpdateProfile";
import Update_address from "./assets/Update_address";
import "./account.css";
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, orders, shiping_info, order_details, error } = useSelector(
    (state) => state.orderDetails
  );
  const { payment_info } = useSelector((state) => state.payment);

  const Logout = () => {
    dispatch(LogoutUser());
    alert.success("user logout");
    navigate("/");
  };
  const Ordershandle = () => {
    navigate("/orders");
  };

  React.useMemo(() => {
    dispatch(order_shipping_info(0));
  }, []);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }

    // dispatch(order_shipping_info(orders && orders.order_info_uuid));

    // dispatch(get_payment_info(orders && orders.order_info_uuid));
  }, [dispatch, error, alert, id, orders]);

  return (
    <>
      <div className="dashboard-container">
        <div className="user-dash-row">
          <div className="tab-buttons">
            <p
              className={activeTab === 0 ? "active" : ""}
              onClick={() => handleTabClick(0)}
            >
              Dashboard
            </p>
            <p
              className={activeTab === 1 ? "active" : ""}
              onClick={() => handleTabClick(1)}
            >
              Orders
            </p>
            {/* <p
              className={activeTab === 2 ? "active" : ""}
              onClick={() => handleTabClick(2)}
            >
              DownLoads
            </p> */}
            <p
              className={activeTab === 2 ? "active" : ""}
              onClick={() => handleTabClick(2)}
            >
              Update addresses
            </p>
            <p
              className={activeTab === 3 ? "active" : ""}
              onClick={() => handleTabClick(3)}
            >
              Update account details
            </p>
            <p
              className={activeTab === 4 ? "active" : ""}
              onClick={() => handleTabClick(4)}
            >
              Update password
            </p>
            <p onClick={Logout}>Logout</p>
          </div>
          <div className="tab-content">
            {activeTab === 0 && (
              <div>
                <p>
                  Hello semo (not semo?{" "}
                  <span
                    onClick={Logout}
                    style={{ color: "#73c631", cursor: "pointer" }}
                  >
                    Log out
                  </span>{" "}
                  )
                </p>
                <p>
                  From your account dashboard you can view your recent{" "}
                  <span
                    onClick={Ordershandle}
                    style={{ color: "#73c631", cursor: "pointer" }}
                  >
                    orders
                  </span>
                  , manage your shipping and billing addresses, and edit your
                  password and account details.
                </p>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <OrderMe />
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <Update_address />
                {/*                 
                <ShippingDetails
                  shiping_info={shiping_info}
                  payment_info={payment_info}
                /> */}
              </div>
            )}
            {activeTab === 3 && (
              <div>
                <UpdateProfile />
              </div>
            )}
            {activeTab === 4 && (
              <div>
                <PasswordUpdate />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
