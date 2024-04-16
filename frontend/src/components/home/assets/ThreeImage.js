import React from "react";
import img1 from "./images/Beauty-Care.webp";
import img2 from "./images/Courrgated-box-3.webp";
import img3 from "./images/dogs-care.webp";

const ThreeImage = () => {
  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="three-main">
          <div>
            <img src={'/Beauty-Care.webp'} />
          </div>
          <div>
            <img src={img2} />
          </div>
          <div>
            <img src={img3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeImage;