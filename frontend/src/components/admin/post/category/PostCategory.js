import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Aside } from "../../aside/Aside";
import PostCategoryForm from "./assets/PostCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  GetBlogCategory,
  ClearError,
  CreatePostCategory,
  DeletePostCategory,
} from "../../../../actions/BlogCategoryAction";
import Loader from "../../../layout/loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { NavLink } from "react-router-dom";
import { FaTrash, FaUpRightFromSquare } from "react-icons/fa6";
import {
  CREATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from "../../../../constants/BlogCategoryConstant";

function PostCategory() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    success,
    error: formError,
  } = useSelector((state) => state.adminCreateBlogCategory);
  const { category, error } = useSelector((state) => state.allBlogCategore);

  const {
    loading: DeleteLoading,
    isDelete,
    error: DeleteError,
  } = useSelector((state) => state.adminDeleteBlogCategory);

  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    title: "",
    description: "",
  });

  const handelInputValue = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { name, slug, title, description } = inputValue;
    dispatch(CreatePostCategory(name, slug, title, description));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (formError) {
      alert.error(formError);
      dispatch(ClearError());
    }
    if (DeleteError) {
      alert.error(DeleteError);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("Category created successfully");
      dispatch({ type: CREATE_CATEGORY_RESET });
      setInputValue({
        name: "",
        slug: "",
        title: "",
        description: "",
      });
    }
    if (isDelete) {
      alert.success("Category Delete Successfully");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    dispatch(GetBlogCategory());
  }, [dispatch, alert, error, success, formError, isDelete, DeleteError]);

  const deletehandler = (id) => {
    dispatch(DeletePostCategory(id));
  };
  const columns = [
    {
      field: "id",
      headerName: "Cetegory id",
      minWidth: 250,
    },
    {
      field: "Title",
      headerName: "Cetegory Title",
      minWidth: 250,
    },
    {
      field: "Name",
      headerName: "Cetegory Name",
      minWidth: 250,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      flex: 0.3,
      shortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink
              to={`/admin/post/update/${params.getValue(params.id, "id")}`}
            >
              <FaUpRightFromSquare />
            </NavLink>

            <span
              onClick={() => deletehandler(params.getValue(params.id, "id"))}
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];
  const rows = [];
  category &&
    category.forEach((item, i) => {
      rows.push({
        id: item._id,
        Title: item.title,
        Name: item.name,
      });
    });

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin All Products
        </title>
        <meta name="keywords" content="Admin All Products" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Post Category</h1>
                    </div>
                    <div className="productdata">
                      <PostCategoryForm
                        inputValue={inputValue}
                        handelInputValue={handelInputValue}
                        submitHandler={submitHandler}
                      />
                    </div>
                    <div className="categore-row">
                      <div className="categore-coll">
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            {category && category.length > 0 ? (
                              <>
                                <div className="table-grid">
                                  <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    // page={10}
                                    disableSelectionOnClick
                                    className="product-list-table"
                                    autoHeight
                                  />
                                </div>
                              </>
                            ) : (
                              <p>no data found</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCategory;