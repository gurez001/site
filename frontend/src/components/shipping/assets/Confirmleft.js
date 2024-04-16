import React from "react";
import { useSelector} from "react-redux";
export const Confirmleft = () => {

  const { shippinginfo } = useSelector((state) => state.cart);

  return (
    <>
      <h2>Shipping info:</h2>
      <div className="shipping-info">
        <div className="h-us-info">
          <p>
            <span>Name:</span>
            <span>{shippinginfo.fullName}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{shippinginfo.email}</span>
          </p>
        </div>
        <div className="addrs-info">
          <p>
            <span>Address:</span>
            <span>{shippinginfo.address}</span>
          </p>
          <p>
            <span>city:</span>
            <span>{shippinginfo.city}</span>
          </p>
          <p>
            <span>pinCode:</span>
            <span>{shippinginfo.pinCode}</span>
          </p>
          <p>
            <span>state:</span>
            <span>{shippinginfo.state}</span>
          </p>
          <p>
            <span>country:</span>
            <span>{shippinginfo.country}</span>
          </p>

          <p>
            <span>phoneNo:</span>
            <span>{shippinginfo.phoneNo}</span>
          </p>
        </div>
      </div>
    </>
  );
};
