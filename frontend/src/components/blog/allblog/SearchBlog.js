import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { ClearError, searchBlog } from "../../../actions/BlogPostAction";
import Loader from "../../layout/loader/Loader";
import { NavLink } from "react-router-dom";


const SearchBlog = () => {
  const [searchInput, setSearchInput] = useState("");
  const [InputLength, setInputLength] = useState(false);

  const dispatch = useDispatch();
const {loading,blog,error}=useSelector((state)=>state.blogsearch)

const searchHandle = (e) => {
  if (e.target.value.length >= 1) {
    setInputLength(true);
  } else {
    setInputLength(false);
  }
  const { name, value } = e.target;
  setSearchInput({ ...searchInput, [name]: value });
};

const handerSearchDropdown = (e) => {
  e.preventDefault();
  setInputLength(false);
  setSearchInput("");
};

useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(ClearError());
  }
  if (InputLength) {
    const { search } = searchInput;
    dispatch(searchBlog(searchInput));
  }
}, [alert, error, dispatch, InputLength, searchInput]);

  return (
    <><div className="blog-serach">
      <input
        type="search"
        value={searchInput.search}
        onChange={searchHandle}
        placeholder="Se
        arch your keyword"
      />
      <div className="search-product">
      <ul className={InputLength ? "listcont" : ""}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {InputLength ? (
                blog && blog.length > 0 ? (
                  blog.map((item, i) => (
                    <li onClick={handerSearchDropdown} key={i}>
                      <NavLink to={`/blog/${item.slug}`}>
                        {/* <img
                          src={`http://localhost:3000/${item.imageId[0].path}`}
                          alt={item.name}
                        /> */}
                        <div style={{display:"block",width:"100%"}}>
                        <div>
                        <p>{item.name}</p></div>
                      
                       </div>
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li className="listcont-not-found">Product not found</li>
                )
              ) : null}
            </>
          )}
        </ul>
      </div>
      </div>
    </>
  );
};

export default SearchBlog;
