import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { singleBlogPost, ClearError } from "../../../actions/BlogPostAction";
import { useParams } from "react-router-dom";
import BlogCategory from "../allblog/BlogCategory";
import Loader from "../../layout/loader/Loader";
import LatestPost from "../allblog/LatestPost";
import SearchBlog from "../allblog/SearchBlog";
import BlogComment from "../comment/BlogComment";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { loading, blog, error } = useSelector((state) => state.singleBlogPage);
  const blogid=blog && blog._id

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(singleBlogPost(id));
  }, [dispatch, alert, error, id]);

  return (
    <>
      <div className="cont-area-h">
        <div className="cont-row">
          <div className="blog-left">
            <article>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div className="single-blog-left">
                    <h1>{blog && blog.title}</h1>
                    <div>
                      <div
                        className="blog-article"
                        dangerouslySetInnerHTML={{
                          __html: blog && blog.article,
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </article>
            <BlogComment blogid={blogid}/>
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
    </>
  );
};
export default SingleBlog;
