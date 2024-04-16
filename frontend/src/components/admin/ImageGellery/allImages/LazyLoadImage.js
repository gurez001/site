import React, { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { server_url } from "../../../../utils/Url";
export const LazyLoadImage = ({ src, alt, handleImageClick, image }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the loading once
    rootMargin: "200px 0px", // Adjust the root margin based on your needs
  });

  //----------------------------------------------------

  const imageRef = useRef(null);

  const handleImageMouseDown = () => {
    if (imageRef.current) {
      imageRef.current.classList.toggle("imgSelectactive");
    }
  };

  return (
    <>
      <div ref={ref} className={`admin-image-cont-coll`}>
        {inView ? (
          <>
            <div ref={imageRef}>
              <img
                onMouseDown={handleImageMouseDown}
                // onMouseUp={handleImageMouseUp}
                onClick={(e) => {
                  handleImageClick(image);
                }}
                src={`${server_url()}/${src}`}
                alt={image && image.altText ? image.altText : "avatar"}
              />
            </div>
          </>
        ) : (
          <div id="homepage" className="prod-collem">
            <div className="item">
              <div className="animated-background image-box"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
