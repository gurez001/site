import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { CiImageOn } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoDesktopOutline } from "react-icons/io5";
import { CiMobile2 } from "react-icons/ci";
import { IoIosMic } from "react-icons/io";
import urlConverter from "../../Url_converter";
import { CharCount } from "../../../components/layout/CharCount/CharCount";
const Preview_Snippet_Editor = ({
  open,
  setOpen,
  seo_input_change_handler,
  seo_input_value,
}) => {
  return (
    <>
      <Dialog
        open={open}
        // maxWidth={'sm'}
        onClose={() => setOpen(false)}
      >
        <div className="postbox seo-editor">
          <div className="row postbox-seo-header space-between-center">
            <h2 className="sm-font-size">Preview Snippet Editor</h2>
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
            </div>
            <div className="seo-box-inner">
              <div className="serp-preview-title row space-between-center">
                <div className="col-md-6">
                  <p className="xsm-font-size">Desktop Preview</p>
                </div>
                <div className="col-md-6">
                  <div
                    style={{ justifyContent: "end" }}
                    className="row seo-header-icon"
                  >
                    <div className="desktop-icon col-md-6">
                      <IoDesktopOutline />
                    </div>
                    <div className="mobile-icon col-md-6">
                      <CiMobile2 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="seo-search-box">
              <div className="row seo-search-input space-between-center">
                <div className="col-md-6">
                  <p>Flap Box</p>
                </div>
                <div className="col-md-6">
                  <div
                    style={{ gap: 10, justifyContent: "end" }}
                    className="row"
                  >
                    <div>
                      <IoIosMic />
                    </div>
                    <div>
                      <IoSearchSharp />
                    </div>
                  </div>
                </div>
              </div>
              <div className="serp-preview-menus">
                <ul style={{ justifyContent: "space-between" }} className="row">
                  <li>
                    <span>
                      {" "}
                      <IoSearchSharp />
                    </span>
                    <span> All</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>Images</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>Videos</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>News</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>Maps</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>More</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>Settings</span>
                  </li>
                  <li>
                    <span>
                      <CiImageOn />
                    </span>
                    <span>Tools</span>
                  </li>
                </ul>
              </div>
              <div style={{ padding: "10px 0" }}>
                <p style={{ fontSize: 14 }} className="xsm-font-size">
                  About 43,700,000 results (0.32 seconds)
                </p>
              </div>
            </div>
          </div>

          <div className="postbox-preview">
            <div className="serp-preview-content">
              <div className="serp-preview-wrapper">
                <div className="group">
                  <div className="serp-url">
                    <div className="xsm-font-size">
                      https://gurez.com/{urlConverter(seo_input_value.seo_slug)}
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
          </div>

          <div className="seo-input-box">
            <div className="seo-input-box-containor">
              <div className="field-group">
                <div className="field-title row space-between-center">
                  <label className="col-md-3 xsm-font-size">Title</label>
                  <div className="length-indicator-wrapper">
                    <CharCount char={seo_input_value.seo_title} limit={60} />

                    <span
                      className={
                        seo_input_value.seo_title.length <= 60
                          ? "length-indicator"
                          : "invalid length-indicator"
                      }
                    >
                      <span
                        style={{
                          left: `${
                            (seo_input_value.seo_title.length / 60) * 100
                          }%`,
                        }}
                      />
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  name="seo_title"
                  value={seo_input_value.seo_title}
                  onChange={(e) => seo_input_change_handler(e)}
                />
                <p style={{ fontSize: 12 }} className="xsm-font-size">
                  This is what will appear in the first line when this post
                  shows up in the search results.
                </p>
              </div>

              <div className="field-group">
                <div className="field-title row space-between-center">
                  <label className="xsm-font-size">Permalink</label>
                  <div className="length-indicator-wrapper">
                    <CharCount char={seo_input_value.seo_slug} limit={75} />

                    <span
                      className={
                        seo_input_value.seo_slug.length <= 75
                          ? "length-indicator"
                          : "invalid length-indicator"
                      }
                    >
                      <span
                        style={{
                          left: `${
                            (seo_input_value.seo_slug.length / 75) * 100
                          }%`,
                        }}
                      />
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  name="seo_slug"
                  value={seo_input_value.seo_slug}
                  onChange={(e) => seo_input_change_handler(e)}
                />
                <p style={{ fontSize: 12 }} className="xsm-font-size">
                  This is the unique URL of this page, displayed below the post
                  title in the search results.
                </p>
              </div>

              <div className="field-group">
                <div className="field-title row space-between-center">
                  <label className="xsm-font-size">Description</label>
                  <div className="length-indicator-wrapper">
                    <CharCount
                      char={seo_input_value.seo_decription}
                      limit={160}
                    />

                    <span
                      className={
                        seo_input_value.seo_decription.length <= 160
                          ? "length-indicator"
                          : "invalid length-indicator"
                      }
                    >
                      <span
                        style={{
                          left: `${
                            (seo_input_value.seo_decription.length / 160) * 100
                          }%`,
                        }}
                      />
                    </span>
                  </div>
                </div>
                <textarea
                  name="seo_decription"
                  value={seo_input_value.seo_decription}
                  onChange={(e) => seo_input_change_handler(e)}
                ></textarea>
                <p style={{ fontSize: 12 }} className="xsm-font-size">
                  This is what will appear as the description when this post
                  shows up in the search results.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <DialogActions>
          <Button>Cancle</Button>
          <Button>Submit</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default Preview_Snippet_Editor;
