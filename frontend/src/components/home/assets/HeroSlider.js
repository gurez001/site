import React from "react";
import "./Heroslider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
const HeroSlider = () => {
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
              src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/Phase3/J23_P3B_PC_NTA_Hero_2x_V1._CB573767479_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/saba/phase2nov1/5300-Kitchen---3-pc-hero-jupiter-2_3000X1200_bank-2_1._CB573749466_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Hero/cam/MMe/Phase_3_Tallhero_3000x1200._CB573749545_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2023/Jupiter/JupiterGW/P3_Diwali-lights_PC_3000x1200_UNREC_BankStripB._CB573763526_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/CEPC_soundbars_speakers/Phase_3_ELP_Fold/Phase_3_Tallhero_3000x12001._CB573744264_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/Jupiter2023GW/Phase3/UNREC-RIDEON-BANK-B-2X-1stNov._CB573763182_.jpg"
              alt="d"
            />
          </div>
          <div>
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/Jupiter2023GW/Phase3/OUTDOOR-BANK-B-2X-1stNov._CB573762852_.jpg"
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
export default HeroSlider;
