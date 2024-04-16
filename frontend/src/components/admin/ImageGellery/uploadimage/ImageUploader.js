import React from "react";
import { Aside } from "../../aside/Aside";
import { NavLink } from "react-router-dom";
import { ImageUploaderForm } from "./ImageUploaderForm";
const ImageUploader = () => {
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-img-cont">
                  <div className="admin-img-title">
                    <div className="gallery-header">
                      <div className="page-title-action">
                        <p>
                          <NavLink to={"/admin/upload/library"}>
                            Library
                          </NavLink>
                        </p>
                      </div>
                    </div>
                    <ImageUploaderForm />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
