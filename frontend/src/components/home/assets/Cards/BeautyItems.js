import React from "react";
import { NavLink } from "react-router-dom";

const BeautyItems = () => {
  const Cards = [
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image:
        "https://gurez.com/wp-content/uploads/2023/10/apple-cider-vinegar-face-wash.webp",
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
      image: "https://gurez.com/wp-content/uploads/2023/09/Moustache-Oil.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image: "https://gurez.com/wp-content/uploads/2023/10/neem-oil-1.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
    {
      tittle: "Starting ₹349 | Bestselling headphones",
      image: "https://gurez.com/wp-content/uploads/2023/10/green-tea.webp",
      link: "/shop/bestselling",
      caption: "See all offers",
    },
  ];
  return (
    <>
      <div className="desktop-grid-4-card">
        <h2>Up to 30% off | Deals on Gurez Brands</h2>
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

export default BeautyItems;
