

import React, { useEffect, useState } from "react";
import { FaSistrix } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { ClearError, searchProduct } from "../../../../actions/ProductAction";
import Loader from "../../loader/Loader";
import { NavLink } from "react-router-dom";
import "./search.css";
import { StarComponent } from "../../../productDetails/assets/StarComponent";

export const Search = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.search);
  const [searchInput, setSearchInput] = useState({ search: "" });
  const [InputLength, setInputLength] = useState(false);

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
      dispatch(searchProduct(search));
    }
  }, [alert, error, dispatch, InputLength, searchInput]);

  return (
    <div className="search-area">
      <div className="search-row">
        <input
          type="search"
          placeholder="Search product"
          name="search"
          value={searchInput.search}
          onChange={searchHandle}
        />
          <div className="search-icon-div">

        <FaSistrix />
          </div>
      </div>
      <div className="search-product">
        <ul className={InputLength ? "listcont" : ""}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {InputLength ? (
                products && products.length > 0 ? (
                  products.map((item, i) => (
                    <li onClick={handerSearchDropdown} key={i}>
                      <NavLink to={`/shop/${item.category}/${item._id}`}>
                        <img
                          src={`http://localhost:3000/${item.imageId[0].path}`}
                          alt={item.name}
                        />
                        <div style={{display:"block",width:"100%"}}>
                        <div>
                        <p>{item.name}</p></div>
                      
                        <div className="search-star" style={{display:"flex",justifyContent:"space-between"}}>
                         
                          <p>
                            price: <ins>{item.price}</ins>
                          </p>
                          <p>
                            maxprice: <del>{item.maxprice}</del>
                          </p>
                          <StarComponent review={item.ratings} />
                        </div></div>
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
  );
};



