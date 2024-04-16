import { Button } from "@material-ui/core";
import React from "react";

const PublishSection = ({ handlePublishBut, loding }) => {
  return (
    <>
      <div className="postbox-container">
        <div className="postbox ">
          <h2>Publish</h2>
          <div className="publish-bnt">
            <Button
              className="button-success"
              disabled={loding ? true : false}
              onClick={() => handlePublishBut()}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishSection;
