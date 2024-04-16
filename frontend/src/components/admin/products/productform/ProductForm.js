import React, { useEffect, useState } from "react";
import MyEditor from "../../../layout/classiceditor/MyEditor";
import SelectCategore from "../../category/allCategory/assets/SelectCategore";
import { Button } from "@material-ui/core";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  createNewProduct,
} from "../../../../actions/ProductAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import Loader from "../../../layout/loader/Loader";
import CreateSeo from "../../seo/create/CreateSeo";

const ProductForm = ({
  createProduct,
  setName,
  setSlug,
  setPrice,
  setMaxPrice,
  setStock,
  inputValue,
  createProductInputHandle,
  articleContentHeandle,
  contentHeandle,
  seoInputValue,
  seoHandler,
}) => {
  const { loding } = useSelector((state) => state.newProduct);

  return (
    <>
      {loding ? (
        <Loader />
      ) : (
        <>
          <form
            className="product-form"
            onSubmit={createProduct}
            encType="multipart/from-data"
          >
            <div className="input-field-area">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name-input"
                onBlur={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-field-area">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                onBlur={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="price">price</label>
              <input
                type="number"
                name="price"
                id="price"
                onBlur={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="maxprice">Max price</label>
              <input
                type="number"
                name="maxprice"
                id="maxpricee"
                onBlur={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="input-field-area input-field-width-cont">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                onBlur={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="input-field-area">
              <label htmlFor="description">description</label>

              <div>
                <MyEditor valueData={inputValue} event={contentHeandle} />
              </div>
            </div>
            <div className="input-field-area">
              <label htmlFor="article ">Article </label>

              <div>
                <MyEditor
                  valueData={inputValue}
                  event={articleContentHeandle}
                />
              </div>
            </div>

            <div>
              <Button
                // disabled={loding || btndisable ? true : false}
                type="submit"
                value="Singup"
              >
                Create list
              </Button>
            </div>
          </form>
          <h2>Product SEO</h2>
          <CreateSeo
            seoInputValue={seoInputValue}
            seoHandler={seoHandler}
            submitHandler={createProduct}
          />
        </>
      )}
    </>
  );
};

export default ProductForm;
