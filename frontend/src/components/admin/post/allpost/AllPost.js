import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import { NavLink, useNavigate } from "react-router-dom";
import "./AllPost.css";
import CreatePost from "../createpost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ClearError, DeleteBlogPost, GetBlogPost } from "../../../../actions/BlogPostAction";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../../layout/loader/Loader";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { TimeAgo } from "../../../layout/time/TimeAgo";
import { DELETE_BLOG_POST_RESET } from "../../../../constants/BlogPostConstants";

function AllPost() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { loading, blog, error } = useSelector((state) => state.allBlog);
  const { loading:deleteLoading, isDeleted, error:deleteError } = useSelector((state) => state.adminDeletePost);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if(deleteError){
      alert.error(deleteError);
      dispatch(ClearError());
    }
    if(isDeleted){
      alert.success('Post has been deleted');
      dispatch({type:DELETE_BLOG_POST_RESET});
    }

    dispatch(GetBlogPost());
  }, [alert, dispatch, error, Navigate,deleteError,isDeleted]);

  const deletehandler = (id) => {
    dispatch(DeleteBlogPost(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "Post id",
      minWidth: 150,
      
    },
    {
      field: "name",
      headerName: "Title",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 150,
      
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      
      renderCell: (params) => <TimeAgo time={params.value} />,
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
  blog &&
    blog.forEach((item, i) => {
      rows.push({
        id: item.postid,
        name: item.title,
        category: item.category && item.category.name,
        date: item.creditAt,
      });
    });

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-post">
                  <div className="all-post-heading">
                  <h2>
                    Posts
                    <span>
                      <NavLink to="/admin/post/add-new-post">Add New</NavLink>
                    </span>
                  </h2></div>
                  <div className="all-products-cont">
                    <div className="all-products-content-area">
                      <div className="all-products-title">
                        <h1>All post</h1>
                      </div>
                      <div className="productdata">
                        {deleteLoading ? (
                          <Loader />
                        ) : (
                          <>
                            {blog && blog.length > 0 ? (
                              <>
                              <div className="table-grid">
                                <DataGrid
                                  rows={rows}
                                  columns={columns}
                                  // page={10}
                                  disableSelectionOnClick
                                  className="product-list-table"
                                  autoHeight
                                /></div>
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

export default AllPost;