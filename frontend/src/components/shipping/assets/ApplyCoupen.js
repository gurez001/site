import { Button } from "@material-ui/core";
import React, { useState } from "react";

function ApplyCoupen({ inputData, CouponinputValue, setCouponinputValue }) {
  return (
    <>
      <div className="apply-coupon">
        <input
          type="text"
          value={CouponinputValue}
          placeholder="Enter coulpen code"
          onChange={(e) => setCouponinputValue(e.target.value)}
        />
        <Button onClick={(e) => inputData(e)}>Apply coupon</Button>
      </div>
    </>
  );
}

export default ApplyCoupen;
