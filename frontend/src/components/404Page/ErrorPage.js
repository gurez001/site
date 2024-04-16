import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import "./errorpage.css";
import MetaData from "../layout/metaData/MetaData";

const ErrorPage = () => {
  return (
    <>
      <MetaData
        title={"Page not found"}
        content={"Page not found"}
        keywords={"Page not found"}
      />
      <section>
        <div className="product-cont">
          <div className="error-page-cont">
            <div className="error-page-col">
              <div>
                <img src="./404.jpg" alt="Error page" />
              </div>
              <NavLink to={"/"}>
                <Button>Home</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
