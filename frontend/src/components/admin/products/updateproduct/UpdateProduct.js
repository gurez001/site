import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import {
  ClearError,
  GetAllProductLabelAction,
  GetProductAttributeAction,
  getProductDetails,
  updateAdminProduct,
} from "../../../../actions/ProductAction";
import { UPDATE_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import Loader from "../../../layout/loader/Loader";
import "./updateproduct.css";
import { Helmet } from "react-helmet";
import { CharCount } from "../../../layout/CharCount/CharCount";
import { ProductSidebar } from "../createproduct/ProductSidebar";
import MetaData from "../../../layout/metaData/MetaData";
import ProductUpdateForm from "../productUpdateform/ProductUpdateForm";
import ImageTabToggle from "../../ImageGellery/uploadimage/ImageTabToggle";
import {
  clearErrors,
  getAllImages,
} from "../../../../actions/imageGelleryAction";
import CreateSeo from "../../seo/create/CreateSeo";
import UpdateForm from "./updateproductform/UpdateForm";
import { getProductPostMeta } from "../../../../actions/PostmetaAction";
import PublishSection from "./assets/PublishSection";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [oldImage, setOldImage] = useState([]);
  const { error: updateError, isUpdate } = useSelector(
    (state) => state.adminProduct
  );
  const { error: imageError, images } = useSelector(
    (state) => state.selectedImages
  );
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { postmeta } = useSelector((state) => state.postMeta);
  const postmetaData = postmeta && postmeta;
  //-----------urlParams
  const { id } = useParams();

  // //--------------handleImageClickOpen

  const handleImageClickOpen = () => {
    setOpen(true);
    dispatch(getAllImages());
  };

  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  const [checkedItems, setCheckedItems] = useState([]);
  const [subcheckedItems, setSubCheckedItems] = useState([]);
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [Variations, setVariations] = useState("");
  const [Default_value, setDefault_value] = useState("");

  //-------------usestate

  const [inputValue, setInputValue] = useState({
    title: "",
    slug: "",
    product_Type: "",
    product_regular_price: "",
    product_sale_price: "",
    SKU: "",
    Stock: "",
    product_uuid:"",
    product_meta_uuid:"",
    Sold_Individually: "",
    Availability_Date: "",
    Weight: "",
    Dimensions: "",
    Shipping_class: "",
    Default_value: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(inputValue);
  };

  //---description
  const descriptionHeandle = (e) => {
    setArticle(e);
  };

  //----------short editor event--
  const shortdesHeandle = (e) => {
    setContent(e);
  };

  const getCurrentImage = () => {
    const imageIds = images && images.map((item) => item._id);
    const oldIds = oldImage && oldImage.map((item) => item._id);
    if (imageIds && imageIds.length !== 0) {
      return imageIds;
    } else {
      return oldIds;
    }
  };

  const currentImageArray = getCurrentImage();

  // dispatch(
  //   updateAdminProduct(id, productData, checkedItems, subcheckedItems)
  // );

  const handleCheckboxChange = (itemIndex, id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubCheckboxChange = (itemIndex, id) => {
    setSubCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
console.log(postmeta)
  useMemo(() => {
    // if (product && product._id !== id) {
      dispatch(getProductDetails(id), []);
    // }
 
  }, []);

  useEffect(() => {
    if (product) {
      setInputValue({
        title: product && product.product_name,
        slug: product && product.slug,
        product_uuid:product && product.product_uuid,
        // article: product && product.product_article,
        // content: product && product.product_description,
        product_Type: product && product.product_Type,
        product_regular_price: product && product.product_regular_price,
        product_sale_price: product && product.product_sale_price,
        SKU: product && product.product_SKU,
        Stock: product && product.product_Stock,
        Sold_Individually: product && product.product_Sold_Individually,
        Availability_Date: product && product.product_Availability_Date,
        Weight: product && product.product_Weight,
        Dimensions: product && product.product_Dimensions,
        Shipping_class: product && product.product_Shipping_class,
        Default_value: product && product.Default_value,
      });
      setOldImage(product && product.product_images);
      setArticle(product && product.product_article);
      setContent(product && product.product_description);

      setCheckedItems(
        product &&
          product.product_category &&
          product.product_category.map((item) => item._id)
      );
      setSubCheckedItems(
        product &&
          product.product_subcategory &&
          product.product_subcategory.map((item) => item._id)
      );
      product.product_meta_uuid && dispatch(getProductPostMeta(product && product.product_meta_uuid), []);
     
      
      
    }
   
    // setVariations(product && product.product_description )
    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(ClearError());
    // }
    // if (imageError) {
    //   alert.error(imageError);
    //   dispatch(clearErrors());
    // }
    // if (error) {
    //   alert.error(error);
    //   dispatch(ClearError());
    // }

    // if (isUpdate) {
    //   alert.success("product updated");
    //   Navigate("/admin/all-products");
    //   dispatch({ type: UPDATE_PRODUCT_RESET });
    // }
    dispatch(GetAllProductLabelAction());
    dispatch(GetProductAttributeAction(""));
  }, [
    alert,
    updateError,
    imageError,
    product,
    isUpdate,
    Navigate,
    id,
    error,
    dispatch
  ]);

  // [
  //
  // ])}

  const handlePublishBut = (e) => {
    // e.preventDefault();
   
      const currentImageArray = getCurrentImage();
     
      let VariationData = Variations ? Variations : postmeta && postmeta;
      console.log(VariationData)
    dispatch(
      updateAdminProduct(
        id,
        checkedItems,
        subcheckedItems,
        article,
        content,
        VariationData,
        inputValue,currentImageArray
      )
    );
  };

  return (
    <>
      <MetaData
        title={"Admin updat product list"}
        content={"Admin updat product list"}
        keywords={"Admin updat product list"}
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
                      <h1>Update Listing</h1>
                    </div>

                    <div className="create-page-contaionr">
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div className="update-left-side-co">
                            <h2>Product</h2>
                            <UpdateForm
                              handleChange={handleChange}
                              handleSubmit={handleSubmit}
                              inputValue={inputValue}
                              descriptionHeandle={descriptionHeandle}
                              shortdesHeandle={shortdesHeandle}
                              article={article}
                              content={content}
                              setDefault_value={setDefault_value}
                              Variations={Variations}
                              setVariations={setVariations}
                            />
                            {/* //----------------------------------

fields
                          //------------------------ */}
                            <h2>SEO</h2>
                            {/* <CreateSeo
                              seoInputValue={seoInputValue}
                              seoHandler={seoHandler}
                              submitHandler={createProduct}
                            /> */}
                          </div>
                          <div className="product-sidebar-containor">
                            <PublishSection
                              handlePublishBut={handlePublishBut}
                            />
                            <Button
                              variant="outlined"
                              onClick={handleImageClickOpen}
                            >
                              Image upload
                            </Button>
                            <ImageTabToggle
                              open={open}
                              close={handleImageClickClose}
                            />
                            <ProductSidebar
                              selectedImage={oldImage && oldImage}
                              handleCheckboxChange={handleCheckboxChange}
                              handleSubCheckboxChange={handleSubCheckboxChange}
                              checkedItems={checkedItems}
                              subcheckedItems={subcheckedItems}
                            />
                          </div>
                        </>
                      )}
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

export default UpdateProduct;
