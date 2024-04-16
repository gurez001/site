import React from "react";
import "./style/style.css";
const Loader = () => {
  return (
    <>
      <div className="loading-containor">
        <div className="loading">
          <div></div>
          <span className="loading-text">LOADING...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
