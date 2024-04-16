import { useState } from "react";
import React from "react";
import "./Producttracking.css";
import booked from "./booked.svg";
import ofd from './OFD.svg';
import ship from './shipped-box-svgrepo-com.svg';
import ndr from './ndr.png';
import { Button } from "@material-ui/core";

const Producttracking = () => {
  return (
    <>
      <div className="tracking">
        <div className="tracking-status">
          <h2>Product Tracking</h2>
          <div className="track-inp">
            <input type="text" placeholder="Tracking ID" /><br />
            <button>Track</button>
          </div>
          <div className="tracker-main">
            <div class="step completed">
              <div class="step-title">
                <h4 class="step-title_1">08 Dec,23</h4>
                <h4 class="step-title_2">05:03 PM</h4>{" "} 
              </div>
              <div class="step-icon-wrap">
                <div class="step-icon">
                  <i>
                    <img alt="img" src={booked} />{" "}
                  </i>
                </div>
              </div>
              <h4 class="step-title_3 dynamicColor2">Booked</h4>
            </div>
            <div class="step completed">
              <div class="step-title">
                <h4 class="step-title_1">08 Dec,23</h4>
                <h4 class="step-title_2">05:03 PM</h4>{" "}
              </div>
              <div class="step-icon-wrap">
                <div class="step-icon">
                  <i>
                    <img alt="img" src={ship} />{" "}
                  </i>
                </div>
              </div>
              <h4 class="step-title_3 dynamicColor2">Picked</h4>
            </div>
            <div class="step completed">
              <div class="step-title">
                <h4 class="step-title_1">08 Dec,23</h4>
                <h4 class="step-title_2">05:03 PM</h4>{" "}
              </div>
              <div class="step-icon-wrap">
                <div class="step-icon">
                  <i>
                    <img alt="img" src={ndr} />{" "}
                  </i>
                </div>
              </div>
              <h4 class="step-title_3 dynamicColor2">Out For Delivery</h4>
            </div>
            <div class="step completed">
              <div class="step-title">
                <h4 class="step-title_1">08 Dec,23</h4>
                <h4 class="step-title_2">05:03 PM</h4>{" "}
              </div>
              <div class="step-icon-wrap">
                <div class="step-icon">
                  <i>
                    <img alt="img" src={ofd} />{" "}
                  </i>
                </div>
              </div>
              <h4 class="step-title_3 dynamicColor2">Delivered</h4>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Producttracking;
