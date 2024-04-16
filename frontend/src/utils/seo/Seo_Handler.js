import React, { useEffect, useMemo, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import General from "./general/General";
import "./style.css";
const Seo_Handler = ({
  seo_data,
  set_seo_input_value,
  seo_input_value,
  set_seo_keywords,
  seo_keywords,
}) => {
 

const seo_input_change_handler = (e)=>{
  const {value,name} = e.target;
  set_seo_input_value({...seo_input_value,[name]:value})
}

  useMemo(() => {
    if (seo_data && !seo_input_value.seo_title) {
      const url = seo_data.title.split(" ").join("-");
      // set_seo_input_value({
      //   seo_title: seo_data && seo_data.title,
      //   seo_slug: url,
      //   seo_decription: seo_data && seo_data.title,
      // });
    }
  }, [seo_data, seo_input_value.seo_title]);

  return (
    <>
      <div className="postbox seo-postbox">
        <div className="postbox-header row space-between-center">
          <h2 className="sm-font-size">SEO</h2>
          <div className="handle-actions">
            <IoMdArrowDropdown />
          </div>
        </div>
        <div className="inside">
          <div className="seo-tabs row">
            <div className="general tab">
              <span>
                <CiSettings />
              </span>
              <span className="xsm-font-size">General</span>
            </div>
            <div className="general tab">
              <span>
                <CiSettings />
              </span>
              <span className="xsm-font-size">Advance</span>
            </div>
            <div className="general tab">
              <span>
                <CiSettings />
              </span>
              <span className="xsm-font-size">Schema</span>
            </div>
            <div className="general tab">
              <span>
                <CiSettings />
              </span>
              <span className="xsm-font-size">Social</span>
            </div>
          </div>
          <div>
            <General
              seo_input_value={seo_input_value}
              seo_input_change_handler={seo_input_change_handler}
              seo_data={seo_data}
              set_seo_keywords={set_seo_keywords}
              seo_keywords={seo_keywords}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Seo_Handler;
