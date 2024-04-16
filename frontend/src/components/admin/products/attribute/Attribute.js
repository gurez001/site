import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import MetaData from "../../../layout/metaData/MetaData";
import "./Attribute.css";
import { Button } from "@material-ui/core";
import AttributeTable from "./assets/AttributeTable";
import AttributeForm from "./assets/AttributeForm";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  GetProductAttributeAction,
  ProductAttributeAction,
  StatusProductAttributeAction,
} from "../../../../actions/ProductAction";
import {
  CREATE_ATTRIBUTE_RESET,
  DELETE_ATTRIBUTE_RESET,
} from "../../../../constants/ProductConstants";
import { v4 as uu } from "uuid";

const Attribute = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const uuid = uu();
  const customID = uuid.slice(0, 12);
  const { loading, success, isDelete, error } = useSelector(
    (state) => state.adminCreateProductAttribute
  );

  const [inputValue, setinputValue] = useState({
    name: "",
    slug: "",
    enable: false,
    typevalue: "",
    orderValue: "",
    riodeValue: "",
    riodeLink: "",
    riodeicon: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setinputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(ProductAttributeAction(customID, inputValue));
  };

  const deletehandler = (id) => {
    console.log("click");
    const isdelete = true;
    dispatch(StatusProductAttributeAction(id, isdelete));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (isDelete) {
      alert.error("Remove successfully");
      dispatch({ type: DELETE_ATTRIBUTE_RESET });
    }
    if (success) {
      alert.success("created successfully");
      dispatch({ type: CREATE_ATTRIBUTE_RESET });
      setinputValue({
        name: "",
        slug: "",
        enable: false,
        typevalue: "",
        orderValue: "",
        riodeValue: "",
        riodeLink: "",
        riodeicon: "",
      });
    }
    dispatch(GetProductAttributeAction());
  }, [dispatch, isDelete, error, alert, success]);

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
                      <h1>Create Product Attribute</h1>
                    </div>
                    <div className="create-page-contaionr">
                      <div className="attribute-left">
                        <AttributeForm
                          inputValue={inputValue}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                        />
                      </div>
                      <div className="attribute-right">
                        <AttributeTable deletehandler={deletehandler} />
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

export default Attribute;
