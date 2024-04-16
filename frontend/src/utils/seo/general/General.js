import React from "react";
import Preview from "./Preview";
import Focus_Keyword from "./Focus_Keyword";

const General = ({
  seo_input_value,
  seo_input_change_handler,
  set_seo_keywords,
  seo_keywords,
}) => {
  return (
    <>
      <Preview
        seo_input_value={seo_input_value}
        seo_input_change_handler={seo_input_change_handler}
      />
      <Focus_Keyword
        set_seo_keywords={set_seo_keywords}
        seo_keywords={seo_keywords}
      />
    </>
  );
};

export default General;
