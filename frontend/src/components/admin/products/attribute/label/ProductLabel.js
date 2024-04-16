import React, { useEffect, useMemo, useState } from "react";
import MetaData from "../../../../layout/metaData/MetaData";
import { Aside } from "../../../aside/Aside";
import AttributeTable from "../assets/AttributeTable";
import ProductLabelForm from "./assets/ProductLabelForm";
import { v4 as uu } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  ProductLabelAction,
  GetProductLabelAction,
  StatusProductAttributLabeleAction,
} from "../../../../../actions/ProductAction";
import {
  CREATE_LABEL_RESET,
  DELETE_LABEL_RESET,
} from "../../../../../constants/ProductConstants";
import ProductLabelTable from "./assets/ProductLabelTable";
import { useParams } from "react-router-dom";
import Loader from "../../../../layout/loader/Loader";

const ProductLabel = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const uuid = uu();
  const customID = uuid.slice(0, 12);
  const { id } = useParams();

  const { loading, data, success, isDelete, error } = useSelector(
    (state) => state.adminProductLabel
  );

  const [inputValue, setinputValue] = useState({
    name: "",
    slug: "",
    description: "",
    SwatchLabel: "",
    color: "",
  });
  const handleChange = (e) => {
    setinputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ProductLabelAction(id, customID, inputValue));
  };

  const deletehandler = (id) => {
    const isdelete = true;
    dispatch(StatusProductAttributLabeleAction(id, isdelete));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (isDelete) {
      alert.success("label deleted successfully");
      dispatch({ type: DELETE_LABEL_RESET });
    }
    if (success) {
      alert.success("label created successfully");
      dispatch({ type: CREATE_LABEL_RESET });
      setinputValue({
        name: "",
        slug: "",
        description: "",
        SwatchLabel: "",
        color: "",
      });
    }
    dispatch(GetProductLabelAction(id));
  }, [dispatch, error, success, isDelete, alert, id]);
  return (
    <>
      <MetaData
        title={"Admin create product list"}
        content={"Admin create product list"}
        keywords={"Admin create product list"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Product Attribute Label</h1>
                    </div>
                    <div className="create-page-contaionr">
                      <div className="attribute-left">
                        <ProductLabelForm
                          inputValue={inputValue}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                        />
                      </div>
                      <div className="attribute-right">
                        {loading ? (
                          <Loader />
                        ) : (
                          <ProductLabelTable
                            deletehandler={deletehandler}
                            data={data}
                          />
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
};

export default ProductLabel;
