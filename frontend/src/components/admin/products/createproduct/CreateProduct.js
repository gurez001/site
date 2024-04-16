import React, { useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import { Button } from "@material-ui/core";
import ImgUploader from "../../ImageGellery/uploadimage/ImageTabToggle";
import { ProductSidebar } from "../createproduct/ProductSidebar";
import MetaData from "../../../layout/metaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../../../actions/imageGelleryAction";
import { useNavigate } from "react-router-dom";
import {
  ClearError,
  GetAllProductLabelAction,
  GetProductAttributeAction,
  createNewProduct,
} from "../../../../actions/ProductAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../../../constants/ProductConstants";
import ProductForm from "./ProductForm";
import PublishSection from "./assets/PublishSection";
import generateUuid from "../../../../utils/Uuidv4";
import Seo_Handler from "../../../../utils/seo/Seo_Handler";
import { create_seo } from "../../../../actions/SeoAction";

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const alert = useAlert();

  const { loding, error, success } = useSelector((state) => state.newProduct);
  const { images } = useSelector((state) => state.selectedImages);
  const [checkedItems, setCheckedItems] = useState([]);
  const [subcheckedItems, setSubCheckedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [article, setArticle] = useState("");
  const [content, setContent] = useState("");
  const [product_Type, setProductType] = useState("Simple product");

  // Genral
  const [product_regular_price, setProduct_regular_price] = useState("");
  const [product_sale_price, setProduct_sale_price] = useState("");

  //Inventory
  const [SKU, setSKU] = useState("");
  const [Stock, setStock] = useState(true);
  const [Sold_Individually, setSold_Individually] = useState(false);
  const [Availability_Date, setAvailability_Date] = useState("");
  //Shiupping
  const [Weight, setWeight] = useState("");
  const [Dimensions, setDimensions] = useState("");
  const [Shipping_class, setShipping_class] = useState("");
  //Variations
  const [Default_value, setDefault_value] = useState("");
  const [Variations, setVariations] = useState(null);

  //------------------seo
  const [seo_keywords, set_seo_keywords] = useState([]);
  const [seo_input_value, set_seo_input_value] = useState({
    seo_title: "",
    seo_slug: "",
    seo_decription: "",
  });

  const seo_data = {
    title,
    content,
  };

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

  //--------------handleImageClickOpen
  const handleImageClickOpen = () => {
    setOpen(true);

    dispatch(getAllImages());
  };
  //----------------handleImageClickClose

  const handleImageClickClose = () => {
    setOpen(false);
  };

  //---description
  const descriptionHeandle = (e) => {
    setArticle(e);
  };

  //----------short editor event--
  const shortdesHeandle = (e) => {
    setContent(e);
  };

  const handlePublishBut = () => {
    const imageIds = images && images.map((item) => item._id);
    let productData = {
      title: title,
      article: article,
      slug:[seo_input_value.seo_slug],
      content: content,
      product_Type: product_Type,
      SKU: SKU,
      Stock: Stock,
      Sold_Individually: Sold_Individually,
      Availability_Date: Availability_Date,
      Weight: Weight,
      Dimensions: Dimensions,
      Shipping_class: Shipping_class,
      product_uuid: generateUuid(),
      product_regular_price: product_regular_price,
      product_sale_price: product_sale_price,
      Default_value: Default_value,
    };
    let VariationData = Variations ? Variations : {};

    let hasError = false;
    switch (true) {
      case !title.trim():
        hasError = true;
        alert.error("fill Product Title field");
        break;
      case !content.trim():
        hasError = true;
        alert.error("fill Product Short Description field");
        break;
      case !article.trim():
        hasError = true;
        alert.error("fill Product Description field");
        break;
      case !product_Type.trim():
        hasError = true;
        alert.error("fill Product Description field");
        break;

      case (imageIds ?? []).length === 0:
        hasError = true;
        alert.error("Please add images");
        break;
      case (checkedItems ?? []).length === 0:
        hasError = true;
        alert.error("Please select parent category");
        break;
      case (subcheckedItems ?? []).length === 0:
        hasError = true;
        alert.error("Please select sub category");
        break;

      case product_Type === "Simple product":
        if (
          product_regular_price.trim() === "" ||
          product_sale_price.trim() === ""
        ) {
          hasError = true;
          alert.error(
            "Please fill in Regular Price and Sale Price fields for a Simple product"
          );
        }
        break;
      case product_Type !== "Simple product":
        if (!Variations) {
          hasError = true;
          alert.error("Please add variations");
          return;
        }
        const meta_value = Variations.meta_value;
        meta_value.forEach((item) => {
          const keys = Object.keys(item);
          keys.forEach((subitem, k) => {
            if (!Variations) {
              hasError = true;
              alert.error("Please add variations");
              return;
            }
            const regularPrice = item[subitem][0].regular_price;
            const salePrice = item[subitem][0].sale_price;

            switch (true) {
              case typeof regularPrice !== "number" ||
                isNaN(regularPrice) ||
                typeof salePrice !== "number" ||
                isNaN(salePrice):
                hasError = true;
                alert.error(`Please add regular amd sale price of ${keys}`);
                break;

              default:
                break;
            }
          });
        });
        if (!Default_value.trim()) {
          hasError = true;
          alert.error("fill Default value field");
          return;
        }
        break;

      default:
        alert.error("success fully add");
        break;
    }
    if (!hasError) {
      dispatch(
        createNewProduct(
          productData,
          VariationData,
          imageIds ? imageIds : [],
          subcheckedItems ? subcheckedItems : [],
          checkedItems ? checkedItems : []
        )
      );
      dispatch(
        create_seo(seo_input_value, productData.product_uuid, generateUuid(),seo_keywords)
      );
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (success) {
      alert.success("product created");
      Navigate("/admin/all-products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    if (!seo_input_value.seo_title) {
      const url = title.split(" ").join("-");
      set_seo_input_value({
        seo_title: title,
        seo_slug: url,
        seo_decription: title,
      });
    }

    dispatch(GetAllProductLabelAction());
    dispatch(GetProductAttributeAction(""));
  }, [alert, error, dispatch, success, Navigate, slug, title]);

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
                      <h1>Add Product</h1>
                    </div>

                    <div className="create-page-contaionr metabox-wrap">
                      <div className="from-contaionr">
                        <ProductForm
                          setTitle={setTitle}
                          setProductType={setProductType}
                          setProduct_regular_price={setProduct_regular_price}
                          setProduct_sale_price={setProduct_sale_price}
                          setSKU={setSKU}
                          setStock={setStock}
                          setSold_Individually={setSold_Individually}
                          setAvailability_Date={setAvailability_Date}
                          setWeight={setWeight}
                          setDimensions={setDimensions}
                          setShipping_class={setShipping_class}
                          setVariations={setVariations}
                          descriptionHeandle={descriptionHeandle}
                          shortdesHeandle={shortdesHeandle}
                          setDefault_value={setDefault_value}
                        />
                        <Seo_Handler
                          seo_data={seo_data}
                          seo_keywords={seo_keywords}
                          set_seo_keywords={set_seo_keywords}
                          seo_input_value={seo_input_value}
                          set_seo_input_value={set_seo_input_value}
                        />
                      </div>
                      <div className="product-sidebar-containor">
                        <PublishSection
                          loding={loding}
                          handlePublishBut={handlePublishBut}
                        />
                        <Button
                          variant="outlined"
                          onClick={handleImageClickOpen}
                        >
                          Image upload
                        </Button>
                        <ImgUploader
                          open={open}
                          close={handleImageClickClose}
                        />
                        <ProductSidebar
                          handleCheckboxChange={handleCheckboxChange}
                          handleSubCheckboxChange={handleSubCheckboxChange}
                          checkedItems={checkedItems}
                          subcheckedItems={subcheckedItems}
                        />
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
export default CreateProduct;
