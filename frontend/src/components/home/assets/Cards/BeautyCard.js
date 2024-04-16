import React from "react";
import { NavLink } from "react-router-dom";

const BeautyCard = () => {
  const Cards = [
    {
      tittle: "Explore our best seliing beauty products",
      image:
        "https://gurez.com/wp-content/uploads/2023/05/cedarwood-oil-1.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
  ];
  return (
    <>
      {Cards.slice(0, 3).map((item, i) => (
        <div key={i} className="desktop-grid-4-card">
          <h2>{item.tittle}</h2>
          <div>
            <NavLink to={item.link}>
              <img src={item.image} alt="item" />
              <span>{item.caption}</span>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  );
};

export default BeautyCard;
