import { Button } from "@material-ui/core";
import React from "react";

const PublishSection = ({handlePublishBut}) => {
  return (
    <>
      <div className="postbox-container">
        <div className="postbox ">
          <h2>Publish</h2>
          {/* <div className="minor-publishing-actions">
            <div className="save-action">
              <Button>Save</Button>
            </div>
            <div className="save-preview">
              <Button>Preview</Button>
            </div>
          </div>

          <div className="misc-publishing-actions">
            <div className="misc-pub-section misc-pub-post-status">
              <div>
                <div className="misc-pub-icon">i</div>
                <div className="misc-pub-content">
                  <p>
                    <span>Status:</span> <span>Draft</span>
                    <span
                      style={{
                        TextDecoder: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </span>
                  </p>
                </div>
              </div>
              <div className="post-status-select">
                <select name="post_status" id="post_status">
                  <option value="pending">Pending Review</option>
                  <option selected="selected" value="draft">
                    Draft
                  </option>
                </select>
                <Button>Ok</Button>
                <p>
                  <span
                    style={{
                      TextDecoder: "underline",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </span>
                </p>
              </div>
            </div>

            <div className="misc-pub-section misc-pub-post-status">
              <div>
                <div className="misc-pub-icon">i</div>
                <div className="misc-pub-content">
                  <p>
                    <span>Visibility:</span> <span>Public</span>
                    <span
                      style={{
                        TextDecoder: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </span>
                  </p>
                </div>
              </div>
              <div className="post-status-select">
                <div
                  id="post-visibility-select"
                  className="hide-if-js"
                  style={{ display: "block" }}
                >
                  <input
                    type="hidden"
                    name="hidden_post_password"
                    id="hidden-post-password"
                    defaultValue
                  />
                  <input
                    type="hidden"
                    name="hidden_post_visibility"
                    id="hidden-post-visibility"
                    defaultValue="public"
                  />
                  <input
                    type="radio"
                    name="visibility"
                    id="visibility-radio-public"
                    defaultValue="public"
                    defaultChecked="checked"
                  />
                  <label htmlFor="visibility-radio-public" className="selectit">
                    Public
                  </label>
                  <br />
                  <input
                    type="radio"
                    name="visibility"
                    id="visibility-radio-password"
                    defaultValue="password"
                  />
                  <label
                    htmlFor="visibility-radio-password"
                    className="selectit"
                  >
                    Password protected
                  </label>
                  <br />
                  <span id="password-span" style={{ display: "none" }}>
                    <label htmlFor="post_password">Password:</label>
                    <input
                      type="text"
                      name="post_password"
                      id="post_password"
                      defaultValue
                      maxLength={255}
                    />
                    <br />
                  </span>
                  <input
                    type="radio"
                    name="visibility"
                    id="visibility-radio-private"
                    defaultValue="private"
                  />
                  <label
                    htmlFor="visibility-radio-private"
                    className="selectit"
                  >
                    Private
                  </label>
                </div>

                <Button>Ok</Button>
                <p>
                  <span
                    style={{
                      TextDecoder: "underline",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </span>
                </p>
              </div>
            </div>
          </div> */}

          <div className="publish-bnt">
            <Button onClick={()=>handlePublishBut()} >Publish</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishSection;
