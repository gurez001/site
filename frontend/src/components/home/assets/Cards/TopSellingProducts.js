import React from 'react'
import { NavLink } from 'react-router-dom';

const TopSellingProducts = () => {
    const Cards = [
        {
          tittle: "Starting ₹349 |Our top categories",
          image:
            "https://gurez.com/wp-content/uploads/2023/04/flea-dog-shampoo-300x300.webp",
          link: "/shop/bestselling",
          caption: "See all",
        },
        {
          tittle: "Starting ₹349 | Bestselling headphones",
          image:
            "https://gurez.com/wp-content/uploads/2023/04/flea-dog-shampoo-300x300.webp",
          link: "/shop/bestselling",
          caption: "See all",
        },
        {
          tittle: "Starting ₹349 | Bestselling headphones",
          image:
            "https://gurez.com/wp-content/uploads/2023/04/flea-dog-shampoo-300x300.webp",
          link: "/shop/bestselling",
          caption: "See all",
        },
        {
          tittle: "Starting ₹349 | Bestselling headphones",
          image:
            "https://gurez.com/wp-content/uploads/2023/04/flea-dog-shampoo-300x300.webp",
          link: "/shop/bestselling",
          caption: "See all",
        },
        {
          tittle: "Starting ₹349 | Bestselling headphones",
          image:
            "https://gurez.com/wp-content/uploads/2023/04/flea-dog-shampoo-300x300.webp",
          link: "/shop/bestselling",
          caption: "See all",
        },
      ];
  return (
    <>
    <div className="desktop-grid-4-card">
      <h2>Starting ₹199 | Our top categories</h2>
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
  )
}

export default TopSellingProducts