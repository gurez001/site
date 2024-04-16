import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LatestPost = () => {
  const { loading, blog, error } = useSelector((state) => state.allBlog);
const latestdata=blog.slice(0,4);



  return (
    <>
      {latestdata && latestdata.map((item, i) => (
          <NavLink to={`/blog/${item.slug}`}>
            <div className="lates-blog-main">
          <img src="https://gurez.com/wp-content/uploads/2023/05/Amazone-tape-3-600x600.webp" />
          <div style={{ display: "block", width: "100%" }}>
            <div>
              <p style={{fontWeight:500}}>{item.creditAt}</p>
            </div>

            <div
              className="search-star"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p >{item.name}</p>
            </div>
          </div>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default LatestPost;
