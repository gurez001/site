import React from "react";
import MetaData from "../../../layout/metaData/MetaData";
import { Aside } from "../../aside/Aside";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const navigate = useNavigate();
  const navigate_new_banner = () => {
    navigate("/admin/home/add-banner");
  };
  return (
    <>
      <MetaData title={"Banners"} keywords={"banner"} content={"banner"} />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <Button onClick={navigate_new_banner}>Add New</Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banners;
