import React from "react";

const AsideAnimation = () => {
  return (
    <>
      <div className="animated-background col1" />
      <hr />
      <div className="animated-background col1" />
      <div className="animated-background col2" />
      <div className="animated-background col3" />
      <div className="animated-background col3" />

      <div className="animated-background col2" />
      <div className="animated-background col3" />
      <div className="animated-background col3" />
      <div style={{marginTop:18}} className="animated-background col1" />
    <div style={{gap:10,padding:'0px 20px 0px'}} className="row">
    <div className="animated-background col4" />
    <div className="animated-background col4" />
    </div>
    <div className="animated-background col5" />
    <div className="animated-background col6" />
    </>
  );
};

export default AsideAnimation;
