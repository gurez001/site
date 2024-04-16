import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { GetBlogCategory } from "../../../../actions/BlogCategoryAction";
import { useNavigate, useParams } from "react-router-dom";
import {
  ClearError,
  singleBlogPost,
  UpdateBlogPost,
} from "../../../../actions/BlogPostAction";
import MyEditor from "../../products/productUpdateform/classiceditor/MyEditor";
import Categore from "./assets/Categore";
import { UPDATE_BLOG_POST_RESET } from "../../../../constants/BlogPostConstants";
import { Button } from "@material-ui/core";
import CreateSeo from "../../seo/create/CreateSeo";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [inputValue, setInputValue] = useState({
    title: "",
    slug: "",
  });

  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const { title, slug } = inputValue;

    if (!seoInputValue) {
      return alert.error("seoInputValue is undefined or null");
    }
    const { seotitle, keyword, metadec, metalink } = seoInputValue;
    if (
      selectedCategoryId.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      slug.trim() === "" ||
      seotitle.trim() === "" ||
      metadec.trim() === "" ||
      metalink.trim() === ""
    ) {
      return alert.error("Please fill out all required fields.");
    }
    dispatch(
      UpdateBlogPost(
        title,
        selectedCategoryId,
        description,
        slug,
        id,
        seotitle,
        keyword,
        metadec,
        metalink
      )
    );
  };

  const { loading, isUpdate, error } = useSelector(
    (state) => state.adminUpdatePost
  );
  const { blog } = useSelector((state) => state.singleBlogPage);

  useMemo(() => {
    //if (blog && blog.postid !== id) {

    dispatch(singleBlogPost(id), []);
    // }
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isUpdate) {
      alert.success("Product succesfully updated!");
      Navigate("/admin/post/all-post");
      dispatch({ type: UPDATE_BLOG_POST_RESET });
    }
    if (blog) {
      setInputValue({
        title: blog && blog.title,
        selectedCategoryId: blog && blog.selectedCategoryId,
        slug: blog && blog.slug,
      });
      setDescription(blog && blog.article);
      setSelectedCategoryId(blog && blog.category && blog.category._id);
      setSeoInputValue({
        seotitle: blog && blog.seo && blog.seo.metatitle,
        keyword: blog && blog.seo && blog.seo.keyword,
        metadec: blog && blog.seo && blog.seo.metadec,
        metalink: blog && blog.seo && blog.seo.metalink,
      });
    }
    dispatch(UpdateBlogPost(id));
    dispatch(GetBlogCategory());
  }, [dispatch, error, blog, alert, isUpdate]);

  console.log(seoInputValue);
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <form onSubmit={submitHandler}>
                  <div className="from-main-div">
                    <div className="form-main-left">
                      <div className="input-field-area">
                        <input
                          type="text"
                          name="title"
                          value={inputValue.title}
                          onChange={inputHandler}
                          placeholder="Add Title"
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="description">description</label>
                        <div>
                          <MyEditor
                            valuedata={description}
                            getData={setDescription}
                          />
                        </div>
                      </div>

                      <div className="input-field-area">
                        <label htmlFor="slug">Slug</label>
                        <input
                          type="text"
                          placeholder="slug"
                          name="slug"
                          value={inputValue.slug}
                          onChange={inputHandler}
                        />
                      </div>
                      <h2>SEO</h2>
                      <CreateSeo
                        seoInputValue={seoInputValue}
                        seoHandler={seoHandler}
                        submitHandler={submitHandler}
                      />

                      <div>
                        <Button type="submit">Update post</Button>
                      </div>
                    </div>
                    <div className="form-main-right">
                      <div>
                        <Categore
                          selectedCategoryId={selectedCategoryId}
                          setSelectedCategoryId={setSelectedCategoryId}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </section>
       
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;
