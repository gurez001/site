import React from "react";

const SinglePageArticle = ({ product }) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: product && product.product_article,
        }}
      />
    </>
  );
};

export default SinglePageArticle;
