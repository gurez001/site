import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Rating } from "@material-ui/lab";

const RatingsFilter = ({
  // --------------- props
  ratingsHeandle,
  ratings,
}) => {
  const options = {
    value: ratings,
    precision: 0.5,
    size: "medium",
    readOnly: true,
  };

  return (
    <>
      <fieldset>
        <Typography component="legend">Rating Above</Typography>
        <Rating {...options} />
        <Slider
          value={ratings}
          onChange={ratingsHeandle}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="off"
          min={0}
          max={5}
        />
      </fieldset>
    </>
  );
};

export default RatingsFilter;
