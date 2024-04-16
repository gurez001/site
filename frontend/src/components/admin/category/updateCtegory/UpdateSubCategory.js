import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import SelectCategore from "../allCategory/assets/SelectCategore";
import CreateSeo from "../../seo/create/CreateSeo";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  SingleSubCategoryAction,
  UpdateSubCategoryAction,
} from "../../../../actions/CategoreAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_SUB_CATEGORIE_RESET } from "../../../../constants/CategoreConstants";

const UpdateSubCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    parent: "",
    title: "",
    description: "",
  });

  const [seoInputValue, setSeoInputValue] = useState({
    seotitle: "",
    keyword: "",
    metadec: "",
    metalink: "",
    productsubcatid: "",
  });

  const handelInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const seoHandler = (e) => {
    const { name, value } = e.target;

    setSeoInputValue({ ...seoInputValue, [name]: value });
  };

  const { loading, data, error } = useSelector(
    (state) => state.adminsingleSubCategory
  );

  const {
    loading: updateloading,
    isUpdate,
    error: updateerror,
  } = useSelector((state) => state.adminUpdateSubCategory);

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, slug, parent, title, description } = inputValue;
    const { seotitle, keyword, metadec, metalink, productsubcatid } =
      seoInputValue;
    console.log(inputValue, seoInputValue);

    dispatch(
      UpdateSubCategoryAction(
        id,
        name,
        slug,
        parent,
        title,
        description,
        seotitle,
        keyword,
        metadec,
        metalink,
        productsubcatid
      )
    );
  };

  useMemo(() => {
    dispatch(SingleSubCategoryAction(id));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (data) {
      setInputValue({
        name: data && data.name,
        slug: data && data.slug,
        parent: data && data.parent,
        title: data && data.title,
        description: data && data.description,
      });
      setSeoInputValue({
        seotitle: data.seo && data.seo.metatitle,
        keyword: data.seo && data.seo.keyword,
        metadec: data.seo && data.seo.metadec,
        metalink: data.seo && data.seo.metalink,
        productsubcatid: data.seo && data.seo.productsubcatid,
      });
    }

    if (updateerror) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdate) {
      alert.success("Sub Category update Successfull");
      dispatch({ type: UPDATE_SUB_CATEGORIE_RESET });
      navigate("/admin/categorie");
    }
  }, [dispatch, error, alert, data && data, isUpdate, updateerror, navigate]);

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                {/* {loading && updateLoading ? (
                <Loader />
              ) : (
                <> */}
                <div className="all-products-cont">
                  <div>
                    <form onSubmit={submitHandler}>
                      <div className="input-field-area">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={inputValue.name}
                          onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="slug">Slug</label>
                        <input
                          type="text"
                          name="slug"
                          value={inputValue.slug}
                          onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="parent">Parent category</label>
                        <SelectCategore
                          parent={inputValue.parent}
                          handelInputValue={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={inputValue.title}
                          onChange={handelInputValue}
                        />
                      </div>
                      <div className="input-field-area">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          value={inputValue.description}
                          onChange={handelInputValue}
                        />
                      </div>
                      <h2>SEO</h2>
                      <CreateSeo
                        seoInputValue={seoInputValue}
                        seoHandler={seoHandler}
                        submitHandler={submitHandler}
                      />
                      <div>
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* </>
              )} */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubCategory;
