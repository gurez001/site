import React from "react";
import { Rating } from "@material-ui/lab";

export const StarComponent = ({ review }) => {
  return (
    <>
      <Rating
        value={parseFloat(review)}
        precision={0.5}
        size={"large"}
        readOnly={true}
        name="sdfg"
      />
    </>
  );
};
