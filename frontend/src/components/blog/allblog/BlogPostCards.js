import React from "react";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { NavLink } from "react-router-dom";
import "./Blog.css";
import DOMPurify from "dompurify";
const BlogPostCards = ({ item }) => {
  function htmlToPlainText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  function sanitizeAndConvertToPlainText(html) {
    const sanitizedHtml = DOMPurify.sanitize(html);
    return htmlToPlainText(sanitizedHtml);
  }
  return (
    <>
      <div className="blog-inner">
        <img src="https://gurez.com/wp-content/uploads/2023/05/Amazone-tape-3-600x600.webp" />
        <div className="blog-text">
          <h2>
            <NavLink to={`/blog/${item.slug}`}>{item.title}</NavLink>
          </h2>

          <p style={{ fontWeight: 500 }}>
            <TimeAndDate time={item.creditAt} />{" "}
            <span style={{ float: "right" }}>
              {item.category && item.category.name}
            </span>
          </p>
          <p className="blog-article">
            {sanitizeAndConvertToPlainText(item.article)}
          </p>
          {/* <p className="blog-article">{item.article}</p> */}
          <NavLink to={`/blog/${item.slug}`}>Read More</NavLink>
        </div>
      </div>
    </>
  );
};

export default BlogPostCards;
