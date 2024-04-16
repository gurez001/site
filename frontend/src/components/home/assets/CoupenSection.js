import { Button } from "@material-ui/core";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CoupenSection = () => {
  const Navigate = useNavigate();
  const clickHandle = () => {
    Navigate("/shop");
  };

  return (
    <>
      <section className="section-cont cop-section section-cont-col-cont">
        <div className="inner-banner cont-area-h">
          <div className="coupen-cont">
            <div className="coupen-col">
              <h2 className="cop-font-cont">Extra 10% Off Welcome</h2>
              <h3 style={{fontSize:"calc((2 - 1) * 1.2vw + 2rem)", color:'#fff'}}>Welcome10</h3>
              <p>Free shipping on all orders</p>
              <Button onClick={clickHandle}>
                Shop now <FaArrowRightLong />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoupenSection;
