import React from "react";
import Cards2 from "./Cards/Cards2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const LatestProducts = ({ products }) => {
  // const settings = {
  //   // dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true, // Enable autoplay
  //   autoplaySpeed: 5000, // Set the autoplay speed in milliseconds (adjust as needed)
  //   appendArrows: "#custom-arrows",
  //   prevArrow: <CustomPrevArrow />,
  //   nextArrow: <CustomNextArrow />,

  // };
  return (
    <>
      {/* <Slider  {...settings}  style={{ height: "200px" }}> */}
      {products &&
        products
          .slice(0, 5)
          .filter((item) => item.productstatus === "Active")
          .map((product, i) => <Cards2 key={i} product={product} />)}
      {/* </Slider> */}
    </>
  );
};

const CustomPrevArrow = (props) => (
  <div className="custom-prev-arrow" onClick={props.onClick}>
    <GrLinkPrevious />
  </div>
);

const CustomNextArrow = (props) => (
  <div className="custom-next-arrow" onClick={props.onClick}>
    <GrLinkNext />
  </div>
);

export default LatestProducts;
