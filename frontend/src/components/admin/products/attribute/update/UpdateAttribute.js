import React, { useEffect, useMemo, useState } from "react";
import AttributeForm from "../assets/AttributeForm";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  ClearError,
  GetProductAttributeAction,
  GetSingleAttributeAction,
  ProductAttributeAction,
  UpdateAttributeAction,
} from "../../../../../actions/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import { Aside } from "../../../aside/Aside";
import { UPDATE_ATTRIBUTE_RESET } from "../../../../../constants/ProductConstants";

const UpdateAttribute = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate=useNavigate();
  // const uuid=uu();
  // const customID=uuid.slice(0,12)
  const { loading, success, data, isupdate,error } = useSelector(
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

    dispatch(UpdateAttributeAction(id,inputValue));
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
  };
  useMemo(() => {
    dispatch(GetSingleAttributeAction(id));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (data) {
      setinputValue({
        name: data && data.name,
        slug: data && data.slug,
        enable: data && data.enable,
        typevalue: data && data.typevalue,
        orderValue: data && data.orderValue,
        riodeValue: data && data.riodeLink,
        riodeLink: data && data.riodeLink,
        riodeicon: data && data.riodeicon,
      });
    }
    if(isupdate){
      alert.success("product Attribute Updated Successfully");
      navigate("/admin/product-attribute")
      dispatch({type:UPDATE_ATTRIBUTE_RESET})
    }
  }, [dispatch, success, error, alert, success, id,isupdate, data]);
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Update Product Attribute</h1>
                    </div>
                    <AttributeForm
                      inputValue={inputValue}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
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

export default UpdateAttribute;
