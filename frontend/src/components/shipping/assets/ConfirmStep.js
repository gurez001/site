import React from "react";
import { CheckoutStep } from "./CheckoutStep";
import { useSelector } from "react-redux";
import { Confirmleft } from "./Confirmleft";
import { ConfirmRight } from "./ConfirmRight";
import "./Confirm.css";
import CartEmty from "./CartEmty";
import MetaData from "../../layout/metaData/MetaData";

export const ConfirmStep = () => {
  const { cartItem, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MetaData
        title={"Cofnirm Step"}
        content={"Cofnirm Step"}
        keywords={"Cofnirm Step"}
      />
       <div className="stepper-main">
        <CheckoutStep activeStep={1} />
      </div>
      <section className="section-cont">
        <div id="prod-cont" className="cont-area-h">
          <div className="confirm-order-page conf-row">
            {cartItem < 1 ? (
              <CartEmty />
            ) : (
              <>
                <div className="con-title">
                  <h1>Order summary</h1>
                </div>
                <div className="conf-containor">
                  <div className="oder-left conf-col">
                    <Confirmleft shippingInfo={shippingInfo} user={user} />
                  </div>
                  <div className="oder-right conf-col">
                    <ConfirmRight
                      cartItem={cartItem}
                      shippingInfo={shippingInfo}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
