import React from "react";
import { Button } from "@material-ui/core";
import MyEditor from "./classiceditor/MyEditor";
const ProductUpdateForm = ({
  inputValue,
  changeInputHandel,
  article,
  setArticle,
  description,
  setDescription,
  createProduct,
}) => {
  return (
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
            value={inputValue.name || ""}
            onChange={changeInputHandel}
          />
        </div>
        <div className="input-field-area">
          <label htmlFor="slug">slug</label>
          <input
            type="text"
            name="slug"
            id="name-input"
            value={inputValue.slug || ""}
            onChange={changeInputHandel}
          />
        </div>
        <div className="input-field-area input-field-width-cont">
          <label htmlFor="price">price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={inputValue.price || ""}
            onChange={changeInputHandel}
          />
        </div>
        <div className="input-field-area input-field-width-cont">
          <label htmlFor="maxprice">Max price</label>
          <input
            type="number"
            name="maxprice"
            id="maxprice"
            value={inputValue.maxprice || ""}
            onChange={changeInputHandel}
          />
        </div>
        <div className="input-field-area input-field-width-cont">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={inputValue.stock || ""}
            onChange={changeInputHandel}
          />
        </div>

        <div className="input-field-area">
          <label htmlFor="description">description</label>

          <div>
            <MyEditor valuedata={description} getData={setDescription} />
          </div>
        </div>
        <div className="input-field-area">
          <label htmlFor="article ">Article </label>

          <div>
            <MyEditor valuedata={article} getData={setArticle} />
          </div>
        </div>

        <div>
          <Button
            // disabled={loding || btndisable ? true : false}
            type="submit"
            value="Singup"
          >
            Update list
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProductUpdateForm;
