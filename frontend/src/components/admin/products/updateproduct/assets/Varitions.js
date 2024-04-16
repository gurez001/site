import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { v4 as uuidv4, v4 } from "uuid";
import generateUuid from "../../../../../utils/Uuidv4";
import { useSelector } from "react-redux";
import { object } from "prop-types";

const Varitions = ({
  Variations,
  setVariations,
  setDefault_value,
  inputValueChangeHandler,
  inputValue,
}) => {
  const [productValue, setProductValue] = useState([]);
  const [inputProductValue, setInputProductValue] = useState([]);
  const labelDataString = sessionStorage.getItem("updatedLabel");
  const labelData = labelDataString ? JSON.parse(labelDataString) : {};
  const { postmeta } = useSelector((state) => state.postMeta);

  let obj = {};
  const varitionsLength = [];
  const varitionsName = [];
  const updatedvaritionsName = [];
  // generateUuid()
  const generateUuidIfEmpty = () => {
    return !labelData || Object.keys(labelData).length === 0
      ? postmeta && postmeta.meta_uuid
      : generateUuid();
  };
  const matadata = {
    meta_uuid: generateUuidIfEmpty(),
    meta_key: postmeta && postmeta.meta_key,
    meta_value: [],
  };

  const metaValue = postmeta && postmeta.meta_value;

  const handleChange = (e, i, position) => {
    const { value } = e.target;

    setProductValue((prevProductValue) => {
      const updatedProductValue = [...prevProductValue];
      const currentValue = updatedProductValue[i] || [];
      currentValue[position] = value;
      updatedProductValue[i] = currentValue;
      return updatedProductValue;
    });
  };

  //-=---------------------------------------------------------------------------------------

  function updatedVarientValue() {
    metaValue &&
      metaValue.forEach((item, i) => {
        const keys = Object.keys(item); // Get the keys of the object
        updatedvaritionsName.push(keys);
        const updatedValue = inputProductValue[i] && inputProductValue[i];

        keys.forEach((key, k) => {
          const innerArray = item[key]; // Access the array associated with the key
          let regularPriceValue =
            innerArray && innerArray[0] && innerArray[0].regular_price;
          let regularChangeValue =
            updatedValue && updatedValue[0].regular_price;

          let salePriceValue =
            innerArray && innerArray[0] && innerArray[0].sale_price;
          let saleChangeValue =
            updatedValue && updatedValue[1] && updatedValue[1].sale_price;

          matadata.meta_value.push({
            [keys[0]]: [
              {
                regular_price:
                  regularChangeValue !== undefined
                    ? regularChangeValue
                    : regularPriceValue,

                sale_price:
                  saleChangeValue !== undefined
                    ? saleChangeValue
                    : salePriceValue,
              },
            ],
          });
        });
      });
  }
  updatedVarientValue();

  //----------------------------------------------------------------------------------------------------

  Object.entries(labelData).forEach(([key, value]) => {
    matadata.meta_key = key;
    obj[key] = obj[key] || [];
    Object.entries(value).forEach(([nestedKey, nestedValue], i) => {
      varitionsLength.push(nestedKey);

      const innerArray = productValue && productValue[nestedKey];
      const firstValue = innerArray ? innerArray[0] : "";
      const secondValue = innerArray ? innerArray[1] : "";

      const numFirstInt = parseInt(firstValue);
      const numSecondInt = parseInt(secondValue);

      obj[key].push({
        [nestedValue.name]: [
          { regular_price: numFirstInt, sale_price: numSecondInt },
        ],
      });
      if (!Array.isArray(matadata.meta_value[i])) {
        // Initialize metadata.meta_value[i] as an empty array
        matadata.meta_value[i] = [];
      }

      matadata.meta_value[i] ={
        [nestedValue.name]: [
          { regular_price: numFirstInt, sale_price: numSecondInt },
        ],
      };
      varitionsName.push(nestedValue.name);
    });
  });

  const AddVaritions = () => {
    setVariations(matadata);
  };

  //---------------input field handler
  const inputChangeHandler = (e, i, fieldIndex) => {
    const priceType = ["regular_price", "sale_price"];
    const newValue = e.target.value;
    setInputProductValue((prevInputProductValue) => {
      const updatedInputProductValue = [...prevInputProductValue];
      // Ensure that the inner array at index 'i' exists
      if (!updatedInputProductValue[i]) {
        updatedInputProductValue[i] = [];
      }
      updatedInputProductValue[i] = [...updatedInputProductValue[i]]; // Copy the inner array

      updatedInputProductValue[i][fieldIndex] = {
        [priceType[fieldIndex]]: parseInt(newValue),
      }; // Update the specific field
      return updatedInputProductValue;
    });
  };

  //---------------input field handler

  useEffect(() => {
    if (postmeta && postmeta.meta_value) {
      const updatedProductValue = postmeta.meta_value.map((item) => {
        const key = Object.keys(item)[0];

        return item[key].map((subItem) => {
          return subItem;
        });
      });

      setInputProductValue(updatedProductValue);
    }
  }, [postmeta]);

  return (
    <>
      <div className="tab-general">
        <div className="tab-left">
          <label>Default Form Values</label>
        </div>
        <div className="tab-right">
          <select
            name="Default_value"
            value={inputValue.Default_value}
            onChange={(e) => inputValueChangeHandler(e)}
          >
            <option value="no shipping class">No default pack</option>
         
            {varitionsName && varitionsName.length>0?(
               varitionsName &&
               varitionsName.map((item, i) => (
                  <option value={item}>{item}</option>
                ))):
            
            updatedvaritionsName &&
              updatedvaritionsName.map((item, i) => (
                <option value={item}>{item}</option>
              ))}
          </select>
        </div>
      </div>

      <div>
        {!labelData || Object.keys(labelData).length === 0 ? (
          <div>
            {inputProductValue &&
              inputProductValue.map((item, i) => (
                <div key={i} className="tab-att-general">
                  <div className="tab-att-header">
                    <div className="tab-att-tittle">
                      <p>{updatedvaritionsName[i]}</p>
                    </div>
                    <div className="tab-att-action">
                      <span>Remove</span>
                      <span>
                        <IoMdArrowDropup />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                  </div>

                  <div className="att-content-area">
                    <div className="attribute-tab-right">
                      <div className="attribute-tab-flex ">
                        <div>
                          <label>Regular price (₹)</label>
                          <input
                            type="number"
                            value={item[0].regular_price}
                            onChange={(e) => inputChangeHandler(e, i, 0)}
                          />
                        </div>
                        <div>
                          <label>Sale price (₹)</label>
                          <input
                            type="number"
                            value={item[0].sale_price}
                            onChange={(e) => inputChangeHandler(e, i, 1)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>
            {varitionsLength &&
              varitionsLength.map((item, i) => (
                <div className="tab-att-general">
                  <div className="tab-att-header">
                    <div className="tab-att-tittle">
                      <p>{varitionsName[i]}</p>
                    </div>
                    <div className="tab-att-action">
                      <span
                      // onClick={(e) => removeAtt(item)}
                      >
                        Remove
                      </span>
                      <span>
                        <IoMdArrowDropup />
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                  </div>
                  <div className="att-content-area">
                    <div className="attribute-tab-right">
                      <div className="attribute-tab-flex ">
                        <div>
                          <label>Regular price (₹)</label>
                          <input
                            type="number"
                            onChange={(e) => handleChange(e, i, 0)}
                          />
                        </div>
                        <div>
                          <label>Sale price (₹)</label>
                          <input
                            type="number"
                            onChange={(e) => handleChange(e, i, 1)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <Button onClick={AddVaritions}>Add</Button>
      </div>
    </>
  );
};

export default Varitions;
