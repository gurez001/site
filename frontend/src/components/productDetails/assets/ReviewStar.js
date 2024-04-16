import React from "react";
import { StarComponent } from "./StarComponent";

export const ReviewStar = ({ review, review_length, review_average }) => {
  const starValue = [1, 2, 3, 4, 5];
  const starInPercentage = [0, 0, 0, 0, 0];

  console.log(review);
  review &&
    review.forEach((item) => {
      const rating = item.rating;
      // starValue[rating - 1] += rating;
      starInPercentage[rating - 1] += 100 / review_length;
    });

  return (
    <div className="rating-col">
      <div className="rating-wrap">
        <div className="heading">
          <div className="he-content">
            <div className="avg-rating-container">
              <div>
                <h3>{review_average && review_average==='NaN'?0:review_average}</h3>
              </div>
              <div>
                <p>Average Rating</p>
                <div>
                  <StarComponent review={review_average && review_average} />
                  <div>({review_length && review_length} Reviews)</div>
                </div>
              </div>
            </div>
            <div className="he-cont-rating">
              {starValue.map((item, i) => (
                <div key={i} className="he-ratings">
                  <StarComponent review={item} />
                  <div className="rating-progress">
                    <div className="rating-progress-bar">
                      <span
                        style={{
                          width: `${Math.round(starInPercentage[i])}%`,
                        }}
                        className="rating-progress-bar-area"
                      ></span>
                    </div>
                    <span>{Math.round(starInPercentage[i])}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="ratings-list"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
