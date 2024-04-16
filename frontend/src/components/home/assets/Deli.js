import React from "react";
import { FcShipped, FcCallback, FcMoneyTransfer } from "react-icons/fc";

const Deli = () => {
  return (
    <>
      <section id="homepage" className="section-cont ">
        <div className=" prod-cont cont-area-h  sell-div">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <FcShipped style={{ fontSize: "60px" }} />
            </div>
            <div class="elementor-icon-box-content">
              <h4
                class="elementor-icon-box-title"
                style={{ color: "black", margin: "0px" }}
              >
                <span>Free shipping &amp; return </span>
              </h4>
              <p class="elementor-icon-box-description">
                Free shipping on all orders{" "}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <FcCallback style={{ fontSize: "60px" }} />
            </div>
            <div class="elementor-icon-box-content">
              <h4
                class="elementor-icon-box-title"
                style={{ color: "black", margin: "0px" }}
              >
                <span>Customer support 24/7 </span>
              </h4>
              <p class="elementor-icon-box-description">
                Instant access to perfect support
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <FcMoneyTransfer style={{ fontSize: "60px" }} />
            </div>
            <div class="elementor-icon-box-content">
              <h4
                class="elementor-icon-box-title"
                style={{ color: "black", margin: "0px" }}
              >
                <span>100% Secure Payment </span>
              </h4>
              <p class="elementor-icon-box-description">
                Gurez ensure secure payment!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Deli;
