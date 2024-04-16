import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  CreateBlogCommentAction,
  GetBlogCommentAction,
} from "../../../actions/BlogCommentAction";
import { CREATE_BLOG_COMMENT_RESET } from "../../../constants/BlogCommentConstant";
import Loader from "../../layout/loader/Loader";

const BlogComment = ({ blogid }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [inputValue, setInputValue] = useState({
    comment: "",
  });
  const blogId = blogid;
  const { loading, data, success, error } = useSelector(
    (state) => state.blogComment
  );
console.log()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment } = inputValue;

    dispatch(CreateBlogCommentAction(blogId, comment));
  setInputValue({
    comment: "",
  })
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("comment added successfully");
      dispatch({ type: CREATE_BLOG_COMMENT_RESET });
    }
    dispatch(GetBlogCommentAction())
  }, [dispatch, error, alert, success, success]);

  return (
    <>{
      loading?<Loader/>:(

      <div className="comment-div">
        <h2>Comments</h2>
        {data.length > 0 ? (
          data && data.map((item, i) =>
            item.blogId === blogId ? (<p key={i} className="comment-p">{item.comment} 
            <span style={{fontWeight:600}}>{item && item.user && item.user.name}</span>
            </p>) : null
          )
        ) : (
          <p>No Comments</p>
        )}
      </div>
      )
    }

      <h3>Leave a Comment</h3>
      <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
         rows={4}
         cols={40}
          placeholder="Your comment"
          name="comment"
          value={inputValue.comment}
          onChange={handleChange}
        />
        <button type="submit">Add Comment</button>
      </form>
      </div>
    </>
  );
};

export default BlogComment;