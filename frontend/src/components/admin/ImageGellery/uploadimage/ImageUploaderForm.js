import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  uploadImage,
} from "../../../../actions/imageGelleryAction";
import { Dropzone, FileMosaic } from "@files-ui/react";

export const ImageUploaderForm = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading: uploadLoading, error } = useSelector(
    (state) => state.uploadImage
  );

  const [files, setFiles] = useState([]);
  const updateFiles = async (incomingFiles) => {
    setFiles(incomingFiles);

    for (const file of incomingFiles) {
      try {
        await dispatch(uploadImage([file]));
        // Wait for the dispatch to complete before moving to the next iteration
      } catch (error) {
        console.error("Error dispatching image upload:", error);
        // Handle error if dispatch fails
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);
  return (
    <>
      <Dropzone onChange={updateFiles} value={files}>
        {files.length > 0 &&
          files.map((file, i) => <FileMosaic key={i} {...file} preview />)}
      </Dropzone>
    </>
  );
};
export default ImageUploaderForm;
