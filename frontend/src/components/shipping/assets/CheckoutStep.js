import React from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import {
  FaClipboardList,
  FaRegCreditCard,
  FaTruckArrowRight,
} from "react-icons/fa6";
import MetaData from "../../layout/metaData/MetaData";

export const CheckoutStep = ({ activeStep }) => {
  const step = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaClipboardList />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <FaTruckArrowRight />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <FaRegCreditCard />,
    },
  ];
  return (
    <>
      <MetaData
        title={"Checkout Step"}
        content={"Checkout Step"}
        keywords={"Checkout Step"}
      />
      <Stepper alternativeLabel activeStep={activeStep}>
        {step.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel style={{ color: activeStep >= i ? "red" : "green" }}>
              <span>{item.icon}</span>
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
