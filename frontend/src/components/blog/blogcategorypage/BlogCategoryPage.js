import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearError, GetBlogPost } from "../../../actions/BlogPostAction";
import { useAlert } from "react-alert";
import { GetBlogCategory } from "../../../actions/BlogCategoryAction";
import Loader from "../../layout/loader/Loader";
import BlogPostCards from "../allblog/BlogPostCards";
import BlogCategory from "../allblog/BlogCategory";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import SearchBlog from "../allblog/SearchBlog";
import LatestPost from "../allblog/LatestPost";

const BlogCategoryPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [blogLength, setBlogLength] = useState(0);
  const { loading, blog, blogPostCount, resultPerpage, error } = useSelector(
    (state) => state.allBlog
  );
  const { category } = useSelector((state) => state.allBlogCategore);

  const filterCatId = category.filter((item) => item.slug === id);
  const catId = filterCatId && filterCatId[0] && filterCatId[0]._id;
  //current page
  const Blength = blog && blog.length;
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useMemo(() => {
    if (Blength < blogPostCount) {
      setBlogLength(blog.length);
    } else {
      setBlogLength(blogPostCount);
    }
    dispatch(GetBlogPost(currentPage, catId));
  }, [currentPage, Blength, blogPostCount, catId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    dispatch(GetBlogCategory());
  }, [dispatch, alert, error]);
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
                  {blog.map((item, i) => (
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
                <LatestPost />
              </div>
            </div>
          </div>
        </div>
      </div>
      {resultPerpage < (Blength < blogPostCount
        ? Blength
        : blogPostCount) && (
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
};

export default BlogCategoryPage;
