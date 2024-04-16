import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearError, GetBlogPost } from "../../../actions/BlogPostAction";
import { useAlert } from "react-alert";
import BlogPostCards from "./BlogPostCards";
import BlogCategory from "./BlogCategory";
import { GetBlogCategory } from "../../../actions/BlogCategoryAction";
import Loader from "../../layout/loader/Loader";
import Pagination from "react-js-pagination";
import SearchBlog from "./SearchBlog";
import LatestPost from "./LatestPost";

function Blog() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, blog, blogPostCount, resultPerpage, error } = useSelector(
    (state) => state.allBlog
  );

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(GetBlogPost(currentPage));
    dispatch(GetBlogCategory());
  }, [dispatch, alert, error, currentPage]);
  return (
    <>
      <div className="cont-area-h">
        <div className="cont-row">
          <div className="blog-left">
            <div id="blog-cards" className="blog-row">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {blog && blog.map((item, i) => (
                    <div key={i} className="blog-post">
                      {/* <NavLink  to={`/blog/${item.slug}`}> */}
                      <BlogPostCards item={item} />
                      {/* </NavLink> */}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="blog-right">
            <div className="right-row">
              <div className="blog-search">
                <SearchBlog />
              </div>
              <h2>Blog category</h2>
              <BlogCategory />
              <div className="latest-post">
                <h2>Latest Post</h2>
                <LatestPost/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {resultPerpage < blogPostCount && (
        <div className="pagination-box">
          <Pagination
            totalItemsCount={blogPostCount}
            activePage={currentPage}
            itemsCountPerPage={resultPerpage}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-items"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
}

export default Blog;
