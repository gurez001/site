import React from "react";
import "./cards.css";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Bestselling from "./Cards/Bestselling";
import BrandCard from "./Cards/BrandCard";
import TopSellingProducts from "./Cards/TopSellingProducts";

const Cards = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const navigeHandel = () => {
    navigate("/registration");
  };

  return (
    <section id="cards-section" className="section-cont">
      <div className="cont-area-h">
        <div className="desktop-grid-4 grid-container">
          <div className="category-card">
            <NavLink to={"/product-category/packing-material/flap-box"}>
              <div>
                <img src="/Flap-box.webp" alt="gurez" />
              </div>
              <h2>FLAP BOX</h2>
            </NavLink>
          </div>
          <div className="category-card">
            <NavLink to={"/product-category/packing-material/3-ply-box"}>
              <div>
                <img src="/courrgated-box-2.webp" alt="gurez"/>
              </div>
              <h2>COURRGATED BOX</h2>
            </NavLink>
          </div>
          <div className="category-card">
            <NavLink to={"/product-category/packing-material/tape"}>
              <div>
                <img src="/Bubble-wrap-Tape-and-bar-code-la (1).webp" alt="gurez"/>
              </div>
              <h2>TAPE & WRAP</h2>
            </NavLink>
          </div>
          <div className="category-card">
            <NavLink to={"/product-category/-pet-products"}>
              <div>
                <img src="/Dog-and-Cat-shampoo-2.webp" alt="gurez"/>
              </div>
              <h2>PET CARE</h2>
            </NavLink>
          </div>
          <div className="category-card">
            <NavLink to={"/product-category/-beauty-item"}>
              <div>
                <img src="/Hair-oil-And-Shampoo-for-men-and.webp" alt="gurez"/>
              </div>
              <h2>BODY CARE</h2>
            </NavLink>
          </div>
          {/* <Bestselling />
          <BrandCard />
          <TopSellingProducts /> */}
          {/* <div className="desktop-grid-4-card">
            {user && user.verified ? (
              <>
                <h2>Hello!{user && user.name}</h2>
                <Button onClick={navigeHandel}>Demo..</Button>
              </>
            ) : (
              <>
                <h2>Sign in for your best experience</h2>
                <div>
                  <Button onClick={navigeHandel}>Sign in securely</Button>
                </div>
              </>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Cards;
