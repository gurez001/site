import React, { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
const Focus_Keyword = ({set_seo_keywords,seo_keywords}) => {

  const [input_value, set_input_value] = useState('');

  const input_change_handler = (value) => {
    set_input_value(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input_value.trim() !== "") {
      addKeywordsList();
    } else if (event.key === "," && input_value.trim() !== "") {
      event.preventDefault(); // Prevent default behavior of adding comma in the input
      addKeywordsList();
    }
  };

  const addKeywordsList = () => {
    set_input_value("");
    set_seo_keywords((prev) => [...prev, input_value.trim()]);
  };

  return (
    <>
      <div className="focus_keyword">
        <h3 className="xsm-font-size">Focus Keyword</h3>
        <div className="key-word-containor">
          <div className="row key-word-containor-border space-between-center">
            <div className="col-md-8">
              <div style={{ alignItems: "center" }} className="row">
                {seo_keywords &&
                  seo_keywords.map((item,i ) => (
                    <div key={i} className="tagify__tag-text">
                      <span>{item}</span>
                      <span>
                        {" "}
                        <CiSquareRemove />
                      </span>
                    </div>
                  ))}
                <input
                  className="tagify__input"
                  type="text"
                  placeholder="Example: flex box"
                  value={input_value}
                  onChange={(e) => input_change_handler(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className="seo-score">
              <span>83 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Focus_Keyword;
