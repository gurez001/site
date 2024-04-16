import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  CreateNewCategore,
  clearErrors,
  create_new_sub_categore,
} from "../../../../../actions/CategoreAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_CATEGORIE_RESET, NEW_SUB_CATEGORIE_RESET } from "../../../../../constants/CategoreConstants";
import generateUuid from "../../../../../utils/Uuidv4";
import ImgUploader from "../../../ImageGellery/uploadimage/ImageTabToggle";
import { getAllImages } from "../../../../../actions/imageGelleryAction";
import { server_url } from "../../../../../utils/Url";
import { IMAGE_ID_RESET } from "../../../../../constants/imageGelleryCartConstants";

const CategoreForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { images } = useSelector((state) => state.selectedImages);

  const { loading, allcategores, success, error } = useSelector(
    (state) => state.Categore
  );
  const { loading:sub_loading,  success:sub_success,error:sub_error } = useSelector((state) => state.sub_Categore);


  const [open, setOpen] = useState(false);
  const [active_img, set_active_img] = useState(null);
  const [img_id, set_img_id] = useState(null);
  const [inputValue, setInputValue] = useState({
    name: "",
    slug: "",
    Parent_category: "None",
    description: "",
  });

  const handelInputValue = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputValue.Parent_category === "None") {
      dispatch(CreateNewCategore(inputValue, generateUuid(), img_id));
      return;
    }
    dispatch(create_new_sub_categore(inputValue, generateUuid(), img_id));
  };

  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);
    dispatch(getAllImages());
  };

  const set_image_handler = (image_id, index) => {
    set_active_img(index);
    set_img_id(image_id._id);
  };
console.log(inputValue.Parent_category)
  useEffect(() => {
    if (images && images.length === 1) {
      set_img_id(images && images[0] && images[0]._id);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (sub_error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
    if (success) {
      setInputValue({
        name: "",
        slug: "",
        Parent_category: "None",
        description: "",
      });
      alert.success("Categore successfuly created");

      dispatch({ type: IMAGE_ID_RESET });
      dispatch({ type: NEW_CATEGORIE_RESET });
      dispatch({ type: NEW_SUB_CATEGORIE_RESET });
    }
    if (sub_success) {
      setInputValue({
        name: "",
        slug: "",
        Parent_category: "None",
        description: "",
      });
      alert.success("Categore successfuly created");

      dispatch({ type: IMAGE_ID_RESET });
      dispatch({ type: NEW_CATEGORIE_RESET });
      dispatch({ type: NEW_SUB_CATEGORIE_RESET });
    }
  }, [alert, images, error, dispatch, success, inputValue,sub_error,sub_success]);

  return (
    <>
      <div className="col-md-12">
        <form className="form" onSubmit={submitHandler}>
          <div className="col-md-12 spacer">
            <label className="block-p xsm-font-size" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={inputValue.name}
              name="name"
              onChange={handelInputValue}
            />
          </div>
          <div className="col-md-12 spacer">
            <label className="block-p xsm-font-size" htmlFor="slug">
              Slug
            </label>
            <input
              type="text"
              value={inputValue.slug}
              name="slug"
              onChange={handelInputValue}
            />
          </div>

          <div className="col-md-12 spacer">
            <label className="block-p xsm-font-size" htmlFor="Parent_category">
              Parent category
            </label>
            <select
              name="Parent_category"
              value={inputValue.Parent_category}
              onChange={handelInputValue}
            >
              <option value={"None"}>None</option>
              {Array.isArray(allcategores) &&
                allcategores.map((item, i) => (
                  <option key={i} value={item.uuid}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="col-md-12 spacer">
            <label className="block-p xsm-font-size" htmlFor="Description">
              Description
            </label>
            <textarea
              type="text"
              value={inputValue.description}
              name="description"
              onChange={handelInputValue}
            ></textarea>
          </div>
          <div className="col-md-12 spacer">
            <label className="block-p xsm-font-size" htmlFor="thumbnail">
              Thumbnail
            </label>
            {console.log(images)}
            <div style={{ gap: 5 }} className="Thumbnail row">
              {images &&
                images.map((item, i) => (
                  <img
                    key={i}
                    onClick={() => set_image_handler(item, i)}
                    className={`cursor-pointer ${
                      active_img === i ? "active-border" : ""
                    }`}
                    src={`${server_url()}/${item.path}`}
                  />
                ))}
            </div>
            {images && images.length > 0 ? (
              images &&
              images.length > 1 &&
              active_img === null && (
                <p style={{ color: "red" }} className="block-p xsm-font-size">
                  Please select one.
                </p>
              )
            ) : (
              <div className="Thumbnail ">
                <img
                  className="active-border"
                  src="/placeholder.webp"
                  alt="placeholder"
                />
              </div>
            )}
            <Button
              className="spacer"
              variant="outlined"
              onClick={() => handleImageClickOpen()}
            >
              Add Thumbnail
            </Button>
            <ImgUploader open={open} close={() => setOpen(false)} />
          </div>
          <div className="spacer">
            <Button
              disabled={inputValue.Parent_category==="None"? loading :sub_loading}
              className={loading && sub_loading? "button-loading" : "button-success"}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoreForm;
