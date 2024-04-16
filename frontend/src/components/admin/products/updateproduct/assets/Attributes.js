import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

const Attributes = () => {
  const [isDesable, setIsDesable] = useState(false);
  const [VisibleAtt, setVisibleAtt] = useState([]);
  const [VisibleLabels, setVisibleLabels] = useState([]);
  const [isVisiable, setIsVisiable] = useState(false);
  const [isLabelVisiable, setIsLabelVisiable] = useState(false);
  const [labelListVisiable, setLabelListVisiable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryValue, setSearchQueryValue] = useState("");

  const { loading, data } = useSelector(
    (state) => state.adminCreateProductAttribute
  );

  const { labelData } = useSelector((state) => state.adminProductLabel);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchQueryValue(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      !item.isdelete &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredLabelData = labelData.filter(
    (item) =>
      !item.isdelete &&
      item.name.toLowerCase().includes(searchQueryValue.toLowerCase())
  );
  const [test, setTest] = useState([]);

  const getAttributeitem = (item) => {
    setTest((prev) => [...prev, { [item.name]: [] }]);
    setVisibleAtt((prev) => [...prev, item]);
    setIsVisiable(false);
  };

  const addLabels = (item, i) => {
    test.forEach((attitem, index) => {
      Object.entries(attitem).forEach(([key, value]) => {
        if (index === i) {
          if (!attitem[key].includes(item)) {
            attitem[key].push(item);
          }
        }
      });
    });

    const orderIdExists = VisibleLabels.some((label) => label._id === item._id);
    if (!orderIdExists) {
      setVisibleLabels((prev) => [...prev, item]);
    }
  };

  const removeAtt = (attItem) => {
    const newVisibleAtt = VisibleAtt.filter((item) => item._id !== attItem._id);
    setVisibleAtt(newVisibleAtt);
  };

  const removeLabel = (label) => {
    const newVisibleAtt = VisibleLabels.filter(
      (item) => item._id !== label._id
    );
    setVisibleLabels(newVisibleAtt);
  };

  // for label diloag
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (VisibleAtt.length > 0) {
      setIsDesable(true);
    } else {
      setIsDesable(false);
    }
    const handleClickOutside = (event) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const rect = dialog.getBoundingClientRect();

      if (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
      ) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDialogOpen, VisibleAtt]);

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const addToLocalStore = () => {
    sessionStorage.setItem("updatedLabel", JSON.stringify(test[0]));
  };

  return (
    <>
      <div className={"attribute-tab"}>
        <div className="attribute-tab-flex ">
          <span
          //  onClick={addAttributs}
          >
            Add New
          </span>
          <div
            className={
              isVisiable ? "attribute-list list-border" : "attribute-list"
            }
          >
            {/* {showAtt ? <span>{showAtt.name}</span> : null} */}
            <Button
              className="att-btn"
              disabled={isDesable ? true : false}
              onClick={() => setIsVisiable(!isVisiable)}
            >
              Add existing <IoIosArrowDown />
            </Button>
            {isVisiable ? (
              <>
                <input
                  type="searching"
                  placeholder="searching"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <div className="attribute-list-ul">
                  <ul>
                    {filteredData &&
                      filteredData
                        .filter((item) => item.isdelete !== true)
                        .map((item, i) => (
                          <li
                            key={i}
                            onClick={() => getAttributeitem(item)}
                            value={item._id}
                          >
                            {item.name}
                          </li>
                        ))}
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {VisibleAtt.length > 0
        ? VisibleAtt &&
          VisibleAtt.map((item, i) => (
            <div key={i} className="tab-att-general">
              <div className="tab-att-header">
                <div className="tab-att-tittle">
                  <p>{item.name}</p>
                </div>
                <div className="tab-att-action">
                  <span onClick={(e) => removeAtt(item)}>Remove</span>
                  <span>
                    <IoMdArrowDropup />
                    <IoMdArrowDropdown />
                  </span>
                </div>
              </div>
              <div className="att-content-area">
                <div className="attribute-tab-left ">
                  <div className="att-content-tittle">
                    <label>Name:</label>
                    <p>{item.name}</p>
                  </div>

                  {/* <div className="att-content-input-box">
                    <label htmlFor="productpage">
                      <input
                        type="checkbox"
                        id="productpage"
                        name="productpage"
                        checked={inputValue.productpage}
                        onChange={onchageInputValue}
                      />
                      <span>Visible on the product page</span>
                    </label>
                  </div> */}
                  {/* <div className="att-content-input-box">
                    <label htmlFor="variations">
                      <input
                        type="checkbox"
                        id="variations"
                        name="variations"
                        checked={inputValue.variations}
                        onChange={onchageInputValue}
                      />
                      <span>Used for variations</span>
                    </label>
                  </div> */}
                </div>
                <div className="attribute-tab-right">
                  <div
                    className={
                      isLabelVisiable || VisibleLabels.length > 0
                        ? "tab-right list-border"
                        : "tab-right"
                    }
                  >
                    <ul
                      className="att-tab-right-label"
                      onFocus={() => setIsLabelVisiable(true)}
                      onBlur={() => setIsLabelVisiable(false)}
                    >
                      {VisibleLabels.length > 0 ? (
                        VisibleLabels.map((item, i) => (
                          <li className="add-label-value">
                            <span>{item.name}</span>
                            <span>
                              <CiCircleRemove
                                style={{ cursor: "pointer" }}
                                onClick={() => removeLabel(item)}
                              />
                            </span>
                          </li>
                        ))
                      ) : (
                        <li>Select values</li>
                      )}
                      <li className="add-label-value-input">
                        <input
                          type="search"
                          placeholder="search value"
                          value={searchQueryValue}
                          // onBlur={()=>setLabelListVisiable(false)}
                          onClick={handleDialogToggle}
                          ref={dialogRef}
                          id="dialog"
                          onFocus={() => setLabelListVisiable(true)}
                          onChange={handleSearchValueChange}
                        />
                      </li>
                    </ul>
                    {/* {isVisiableLabelList ? ( */}
                    {isDialogOpen && (
                      <ul>
                        {filteredLabelData &&
                          filteredLabelData
                            .filter((label) => label.attributeid === item._id)
                            .map((item, j) => (
                              <li key={j} onClick={() => addLabels(item, i)}>
                                {item.name}
                              </li>
                            ))}
                      </ul>
                    )}
                    {/* // ) : null} */}
                  </div>
                  <div className="attribute-tab-flex ">
                    <p>
                      <span>select all</span>
                      <span>select none</span>
                    </p>
                    <p>
                      <span>create value</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}

      <Button onClick={addToLocalStore}>Add</Button>
    </>
  );
};

export default Attributes;
