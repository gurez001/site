import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Preview_Snippet_Editor from "./Preview_Snippet_Editor";
import urlConverter from "../../Url_converter";

const Preview = ({ seo_input_value, seo_input_change_handler }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="components-panel__body">
        <div className="serp-preview">
          <div className="serp-preview-title">
            <p>Preview</p>
            <div className="serp-preview-content">
              <div className="serp-preview-wrapper">
                <div className="group">
                  <div className="serp-url">
                    <div className="xsm-font-size">
                      
                      {`https://gurez.com/${urlConverter(seo_input_value.seo_slug)}`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="group">
                <h5 className="serp-title capitalize">
                  {seo_input_value.seo_title}
                
                </h5>
              </div>
              <div className="group">
                <div className="serp-description">
                  <p className="xsm-font-size">
                   {seo_input_value.seo_decription}
                  </p>
                </div>
              </div>
            </div>
            <div className="components-button">
              <Button onClick={() => setOpen(true)} className="xsm-font-size">
                Edit Snippet
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Preview_Snippet_Editor
          open={open}
          setOpen={setOpen}
          seo_input_change_handler={seo_input_change_handler}
          seo_input_value={seo_input_value}
        />
      )}
    </>
  );
};

export default Preview;
