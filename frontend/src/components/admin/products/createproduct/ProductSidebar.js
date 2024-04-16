import React, { useEffect, useState } from "react";
import { imagePrimary } from "../../../../actions/imageGelleryAction";
import { useDispatch, useSelector } from "react-redux";
import SelectCategore from "../../category/allCategory/assets/SelectCategore";
import "./ProductSidebar.css";
import { server_url } from "../../../../utils/Url";

export const ProductSidebar = ({
  selectedImage,
  handleCheckboxChange,
  handleSubCheckboxChange,
  checkedItems,
  subcheckedItems,
}) => {
  const [checkPrimary, setcheckPrimary] = useState("");
  const [isVisibal, setIsVisibal] = useState(null);
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.selectedImages);
  // const [ParentCat, setParentCat] = useState([]);

  const handlePrimary = (item, i) => {
    setIsVisibal(i);
    setcheckPrimary(item._id);
    dispatch(imagePrimary(item._id));
  };

  return (
    <>
      <div>
        <div className="non-Primary-containor">
          {images
            ? images &&
              images.map((item, i) => (
                <div key={i}>
                  {item._id !== checkPrimary ? (
                    <img src={`${server_url()}/${item.path}`} alt="jgjg" />
                  ) : null}
                </div>
              ))
            : selectedImage &&
              selectedImage.map((item, i) => (
                <div
                  className={isVisibal === i ? "non-Primary-inactive" : null}
                  onClick={() => {
                    handlePrimary(item, i);
                  }}
                  key={i}
                >
                  {item._id !== checkPrimary ? (
                    <img
                      src={`${server_url()}/${item.path}`}
                      alt="jgjg"
                    />
                  ) : null}
                </div>
              ))}
        </div>
        <div className="cat-containor">
          <div>
            <h2 className="sortable-handle ">Product categories</h2>
            <SelectCategore
              // setParentCat={setParentCat}
              handleCheckboxChange={handleCheckboxChange}
              handleSubCheckboxChange={handleSubCheckboxChange}
              checkedItems={checkedItems}
              subcheckedItems={subcheckedItems}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductSidebar;
