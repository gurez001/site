import React from "react";
import { NavLink } from "react-router-dom";

export const CategorySection = () => {
  
  return (
    <>
      <section className="section-cont">
        <div className="coll-title">
          <h2>Our Category</h2>
        </div>
        <div className="post-cat-cont cont-area-h">
          <div className="post-cat-cont-area">
            {cat &&
              cat.map((item, i) => (
                <div className="cate-card" key={i}>
                  <NavLink to={`/category/${item.link}`}>
                    <img src={item.img} alt={item.Cname} />
                  </NavLink>
                  {/* <p>{item.Cname}</p> */}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
