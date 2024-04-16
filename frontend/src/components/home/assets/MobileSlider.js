import React from "react";
import "./Heroslider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const MobileSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set the autoplay speed in milliseconds (adjust as needed)
    appendArrows: "#custom-arrows",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section>
      <div className="slider-containor">
        <Slider {...settings}>
          <div>
            <img
              src="https://ghaindia.in/wp-content/uploads/2023/08/home-2.png"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://ghaindia.in/wp-content/uploads/2023/08/home.png"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://ghaindia.in/wp-content/uploads/2023/08/home-3.png"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://ghaindia.in/wp-content/uploads/2023/09/About.jpg"
              alt="d"
            />
          </div>
         
        </Slider>
      </div>
    </section>
  );
};
const CustomPrevArrow = (props) => (
  <div className="custom-prev-arrow custom-arrow" onClick={props.onClick}>
    <FaAngleLeft />
  </div>
);

const CustomNextArrow = (props) => (
  <div className="custom-next-arrow custom-arrow" onClick={props.onClick}>
    <FaAngleRight />
  </div>
);
export default MobileSlider;