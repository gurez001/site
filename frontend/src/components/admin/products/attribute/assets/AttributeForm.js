import { Button } from "@material-ui/core";
import React from "react";

const AttributeForm = ({ inputValue, handleChange, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="attribute-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
          />
        </div>
        <div className="attribute-input">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={inputValue.slug}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="enable"
            value={inputValue.enable}
            onChange={handleChange}
          />
          <span>Enable Archives?</span>
        </div>
        <div className="attribute-input">
          <label>Type</label>
          <select
            name="typevalue"
            value={inputValue.typevalue}
            onChange={handleChange}
          >
            <option>select</option>
            <option value="color">Color</option>
            <option value="label">Label</option>
            <option value="image">Image</option>
          </select>
        </div>
        <div className="attribute-input">
          <label>Default sort order</label>
          <select
            name="orderValue"
            value={inputValue.orderValue}
            onChange={handleChange}
          >
            <option>Custom Ordering</option>
            <option value="name">Name</option>
            <option value="nameNumeric">Name Numeric</option>
            <option value="termid">Term ID</option>
          </select>
        </div>
        <div className="attribute-input">
          <label>Riode Guide block</label>
          <select
            name="riodeValue"
            value={inputValue.riodeValue}
            onChange={handleChange}
          >
            <option>select</option>
            <option value="footerSubscribeBlock">Footer Subscribe Block</option>
            <option value="shopMenuBanner">Shop Menu Banner</option>
            <option value="productsMenuBanner">Products Menu Banner</option>
            <option value="shopPTB">Shop PTB</option>
            <option value="sizeGuideBlock">Size Guide Block</option>
          </select>
        </div>
        <div className="attribute-input">
          <label htmlFor="riodeLink">Riode Guide link text</label>
          <input
            type="text"
            name="riodeLink"
            value={inputValue.riodeLink}
            onChange={handleChange}
          />
        </div>
        <div className="attribute-input">
          <label htmlFor="riodeicon">Riode Guide link icon</label>
          <input
            type="text"
            name="riodeicon"
            value={inputValue.riodeicon}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit+">Submit</Button>
        </div>
      </form>
    </>
  );
};

export default AttributeForm;
