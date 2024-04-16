import React from "react";
import { useSelector } from "react-redux";
import { Profile } from "./assets/Profile";
import "./account.css";
import MetaData from "../layout/metaData/MetaData";

export const Account = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MetaData
        title={`${user && user.name} Profile"`}
        content={`${user && user.name} Profile`}
        keywords={`${user && user.name} Profile`}
      />
      <section className="section-cont">
        <div id="prod-cont" className="cont-area-h">
          <Profile />
        </div>
      </section>
    </>
  );
};
