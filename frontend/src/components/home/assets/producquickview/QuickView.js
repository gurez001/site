import React, { useMemo, useState } from "react";
import ImageLightbox from "../../../productDetails/assets/ImageLightbox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProductDetails } from "../../../../actions/ProductAction";
import { addItemsToCart } from "../../../../actions/cartAction";
import { wishListAction } from "../../../../actions/wishListAction";
import Details from "../../../productDetails/assets/Details";
import AddQuantitBtns from "../../../productDetails/assets/AddQuantitBtns";
import AddToCartBtn from "../../../productDetails/assets/AddToCartBtn";
import { Dialog, DialogContent } from "@material-ui/core";
import { getProductPostMeta } from "../../../../actions/PostmetaAction";

const QuickView = ({ productId, setQuickOpen }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const id = productId;
  const { product } = useSelector((state) => state.productDetails);
  const [label, setLabel] = useState("");
  const [variantPriceValue, setVariantPriceValue] = useState([]);
  let defaultPrice = product && product.product_sale_price;
  const [quentity, setQuentity] = useState(1);
  const productUuid = product && product.product_uuid;
  const productType = product && product.product_Type;
  //-----increase quentity

  const increaseQuantity = () => {
    if (product.stock <= quentity) return;
    const quty = quentity + 1;
    setQuentity(quty);
  };

  //-----decrease quentity

  const decreaseQuantity = () => {
    if (1 >= quentity) return;
    const quty = quentity - 1;
    setQuentity(quty);
  };

  //---add to cart item
  const addToCartHandler = () => {
    dispatch(
      addItemsToCart(
        id,
        quentity,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    alert.success("Item Added to Cart");
  };
  //-------add to wishlist item

  const addToWishtHandler = () => {
    dispatch(
      wishListAction(
        id,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    alert.success("Item Added to Wishlist");
  };

  //--------buy handler
  const buyHandler = () => {
    dispatch(
      addItemsToCart(
        id,
        quentity,
        variantPriceValue.length === 0 ? defaultPrice : variantPriceValue[0],
        label
      )
    );
    Navigate("/cart");
  };

  useMemo(() => {
    dispatch(getProductDetails(id));
    if (product) {
      setLabel(product && product.Default_value);
    }
    if (productType === "Variable product") {
      dispatch(getProductPostMeta(productUuid));
    }
  }, [dispatch, id, productUuid && productUuid, productType && productType]);

  const removeToggle = () => {
    setOpen(!open);
    setQuickOpen(false);
  };

  // useMemo(() => {

  // }, [dispatch, id, ]);

  return (
    <>
      <Dialog
        maxWidth="xl"
        className="review-main-div"
        area-aria-labelledby="simpale-dialog-title"
        open={open}
        onClose={removeToggle}
      >
        {/* <DialogTitle>Submit Review</DialogTitle> */}
        <DialogContent className="submitDialog">
          <div className="quick-container">
            <div className="quick-row">
              <div className="quick-left">
                <section className="section-cont prod-details-page">
                  <div className="product-cont">
                    <div className="product-single">
                      <div className="product-main">
                        <div className="product-main-left">
                          <div className="product-gallery">
                            <div className="main-product-gallery">
                              <ImageLightbox
                                product_images={product && product.product_images}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="product-main-right">
                          <div className="product-details">
                            <Details
                              product={product && product}
                              setVariantPriceValue={setVariantPriceValue}
                              variantPriceValue={variantPriceValue}
                              setLabel={setLabel}
                            />
                            <div className="product-purchase">
                              <AddQuantitBtns
                                decreaseQuantity={decreaseQuantity}
                                quentity={quentity}
                                increaseQuantity={increaseQuantity}
                              />
                              <AddToCartBtn
                                product={product}
                                addToCartHandler={addToCartHandler}
                                buyHandler={buyHandler}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="quick-right"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickView;
