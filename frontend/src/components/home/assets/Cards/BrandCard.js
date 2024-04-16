import React from "react";
import { NavLink } from "react-router-dom";

const BrandCard = () => {
  const Cards = [
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/04/corrugated-box-flap.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
  ];
  return (
    <>
      <div className="desktop-grid-4-card">
        <h2>Up to 70% off | Deals on Box Brother Brands</h2>
       <div className="desktop-grid-2">
       {Cards.slice(0, 4).map((item, i) => (
          <div key={i}>
            <NavLink to={item.link}>
              <img src={item.image} alt="item" />
              <span>{item.caption}</span>
            </NavLink>
          </div>
        ))}
       </div>
      </div>
    </>
  );
};

export default BrandCard;
