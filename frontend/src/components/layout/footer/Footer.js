import React from "react";
import { FootLeft } from "./assets/FootLeft";
import { FootMid } from "./assets/FootMid";
import { FootRight } from "./assets/FootRight";
import "./style.css";
import SocilaMedia from "./assets/SocilaMedia";
import NewsLetter from "./assets/NewsLetter";

export const Footer = () => {
  return (
    <footer className="footer">
      <div
        className="main-footer"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <NewsLetter />
      </div>
      <div className="foot-col">
        <FootLeft />
        <FootMid />
        <FootRight />
        <SocilaMedia />
      </div>
      <div className="rights">
        <p style={{ textAlign: "center" }}>Gurez © 2022. All Rights Reserved</p>
      </div>
    </footer>
  );
};
