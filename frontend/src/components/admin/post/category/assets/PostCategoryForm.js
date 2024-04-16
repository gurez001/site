import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePostCategory,
  ClearError,
} from "../../../../../actions/BlogCategoryAction";
function PostCategoryForm({inputValue,handelInputValue,submitHandler}) {


  return (
    <>
      <div className="form-div">
        <form onSubmit={submitHandler}>
          <div className="input-field-area">
            <label>Name</label>
            <input
              type="text"
              value={inputValue.name}
              name="name"
              onChange={handelInputValue}
            />
          </div>
          <div className="input-field-area">
            <label>Slug</label>
            <input
              type="text"
              value={inputValue.slug}
              name="slug"
              onChange={handelInputValue}
            />
          </div>

          <div className="input-field-area">
            <label>Title</label>
            <input
              type="text"
              value={inputValue.title}
              name="title"
              onChange={handelInputValue}
            />
          </div>
          <div className="input-field-area">
            <label>Description</label>
            <input
              type="text"
              value={inputValue.description}
              name="description"
              onChange={handelInputValue}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PostCategoryForm;