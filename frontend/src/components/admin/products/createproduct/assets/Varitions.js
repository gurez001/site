import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { v4 as uuidv4, v4 } from "uuid";
import generateUuid from "../../../../../utils/Uuidv4";

const Varitions = ({ setVariations, setDefault_value }) => {
  const [productValue, setProductValue] = useState([]);
  const labelDataString = sessionStorage.getItem("label");
  const labelData = labelDataString ? JSON.parse(labelDataString) : {};

  let obj = {};
  const varitionsLength = [];
  const varitionsName = [];

  const matadata = {
    meta_uuid: generateUuid(),
    meta_key: "",
    meta_value: [],
  };

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

  Object.entries(labelData).forEach(([key, value]) => {
    matadata.meta_key = key;
    obj[key] = obj[key] || [];
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
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

      matadata.meta_value.push({
        [nestedValue.name]: [
          { regular_price: numFirstInt, sale_price: numSecondInt },
        ],
      });
      varitionsName.push(nestedValue.name);
    });
  });

  const AddVaritions = () => {
    setVariations(matadata);
  };

  return (
    <>
      <div className="tab-general">
        <div className="tab-left">
          <label>Default Form Values</label>
        </div>
        <div className="tab-right">
          <select
            onChange={(e) => setDefault_value(e.target.value)}
            name="shippingclass"
          >
            <option value="no shipping class">No default pack</option>
            {varitionsLength &&
              varitionsLength.map((item, i) => (
                <option value={varitionsName[i]}>{varitionsName[i]}</option>
              ))}
          </select>
        </div>
      </div>

      <div>
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
                    {Number(productValue[i] && productValue[i][0]) <
                    Number(productValue[i] && productValue[i][1]) ? (
                      <p className="danger-text xsm-font-size">
                        Sale price should be less then from Regular price
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Button onClick={AddVaritions}>Add</Button>
      </div>
    </>
  );
};

export default Varitions;
