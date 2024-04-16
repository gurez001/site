import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import SelectCategore from "../allCategory/assets/SelectCategore";
import CreateSeo from "../../seo/create/CreateSeo";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getSingleParentCat,
  updateParentCategory,
} from "../../../../actions/CategoreAction";
import { UPDATE_PARENT_CATEGORIE_RESET } from "../../../../constants/CategoreConstants";

const UpdateCategory = () => {
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

  const { loading, parent, error } = useSelector(
    (state) => state.adminSingleCategory
  );

  const {
    loading: updateLoading,
    isUpdate,
    error: updateError,
  } = useSelector((state) => state.adminUpdateParentCategory);

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, slug, parent, title, description } = inputValue;
    const { seotitle, keyword, metadec, metalink, productsubcatid } =
      seoInputValue;

    dispatch(
      updateParentCategory(
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
    dispatch(getSingleParentCat(id));
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (parent) {
      setInputValue({
        name: parent && parent.name,
        slug: parent && parent.slug,
        parent: parent && parent._id,
        title: parent && parent.title,
        description: parent && parent.description,
      });
      setSeoInputValue({
        seotitle: parent.seo && parent.seo.metatitle,
        keyword: parent.seo && parent.seo.keyword,
        metadec: parent.seo && parent.seo.metadec,
        metalink: parent.seo && parent.seo.metalink,
        productsubcatid: parent.seo && parent.seo.productcatid,
      });
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdate) {
      alert.success("Parent category Updated Successfully");
      dispatch({ type: UPDATE_PARENT_CATEGORIE_RESET });
      navigate("/admin/categorie");
    }
  }, [dispatch, alert, error, updateError,parent, isUpdate]);

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

export default UpdateCategory;