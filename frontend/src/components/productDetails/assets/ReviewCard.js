import React, { useEffect } from "react";
import { StarComponent } from "./StarComponent";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { server_url } from "../../../utils/Url";

const ReviewCard = ({ review, length }) => {
 
  return (
    <>
      <div style={{ gap: 10 }} className="review-card row">
        <div className="rev-img col-md-2">
          {/* <img src="/logo512.png" alt="user" /> */}
          <img
            src={
              review.user &&
              review.user.avatar &&
              review.user.avatar.url !== null
                ? `${server_url()}${
                    review.user && review.user.avatar && review.user.avatar.url
                  }`
                : "/icon.png"
            }
            alt="user"
          />
        </div>
        <div className="rev-card-cont col-md-8">
          <h4 style={{ color: "#3d3d3d", margin: 0 }}>
            By <span>{review.user && review.user.name}</span>
          </h4>
          <div className="ratings">
            <StarComponent review={review.rating} />
          </div>
          <p className="xsm-font-size" style={{ margin: "5px 0px 5px" }}>
            {review.comment}
          </p>
          <p className="xsm-font-size" style={{ margin: "5px 0px 5px" }}>
            <TimeAndDate time={review.createdate} />
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
