import React, { useEffect, useState } from "react";
import "./style.css";
import { ClearError, getProduct } from "../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Product from "./assets/ProductCard";
import { useAlert } from "react-alert";
import CoupenSection from "./assets/CoupenSection";
import MetaData from "../layout/metaData/MetaData";
import Cards from "./assets/Cards";
import HeroSlider from "./assets/HeroSlider";
import NewProducts from "./assets/NewProducts";
import SaleSection from "./SaleSection";
import ProductAnimation from "../layout/loader/ProductAnimation";
import Deli from "./assets/Deli";
import MobileSlider from "./assets/MobileSlider";

export const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products, newproducts } = useSelector(
    (state) => state.products
  );
  const { error: fProductError } = useSelector((state) => state.productFeature);
  const length = [1, 2, 3, 4, 5, 6, 7, 8];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (fProductError) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(getProduct());
    // dispatch(featureProduct());
  }, [dispatch, error, alert, fProductError]);

  return (
    <>
      <MetaData
        title={"Home"}
        content={"Discover toy fectory"}
        keywords={"toys"}
      />
      {windowWidth < 768 ? <MobileSlider /> : <HeroSlider />}
      <Cards />
      <section id="homepage" className="section-cont">
        <div className="coll-title">
          <h2>Best Sellers​</h2>
        </div>
        <div id="prod-cont" className="prod-cont cont-area-h">
          <div className="row flex-wrap">
            {loding
              ? length.map((item, i) => <ProductAnimation key={i} />)
              : newproducts &&
                newproducts
                  .slice(0, 8)
                  .filter((item) => item.productstatus === "Active")
                  .map((product, i) => (
                    <div className="card-col prod-collem" key={i}>
                      <NewProducts product={product} />
                    </div>
                  ))}
          </div>
        </div>
      </section>

      <section id="homepage" className="section-cont">
        <div className="img-containor">
          <div id="prod-cont" className="prod-cont cont-area-h">
            <div style={{ gap: 10 }} className="row image-card">
              <div className="col-md-5 border-radius">
                <img src="./Beauty-Care.webp" alt="Beauty-Care" />
              </div>
              <div className="col-md-5 border-radius">
                <img src="./Courrgated-box-3.webp" alt="Courrgated-box" />
              </div>
              <div className="col-md-5 border-radius">
                <img src="./dogs-care.webp" alt="dogs-care" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoupenSection />
      <section id="homepage" className="section-cont">
        <div className="coll-title">
          <h2>Our Featured</h2>
        </div>

        <div id="prod-cont" className="prod-cont cont-area-h">
          <div className="row flex-wrap">
            {loding
              ? products &&
                products.map((item, i) => <ProductAnimation key={i} />)
              : products &&
                products
                  .slice(0, 8)
                  .filter((item) => item.productstatus === "Active")
                  .map((product, i) => (
                    <div className="card-col prod-collem" key={i}>
                      <Product product={product} />
                    </div>
                  ))}
          </div>
        </div>
      </section>
      <SaleSection />
      <Deli />
    </>
  );
};
