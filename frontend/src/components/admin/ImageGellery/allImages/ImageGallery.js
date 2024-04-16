import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import {
  clearErrors,
  getAllImages,
  getImageId,
} from "../../../../actions/imageGelleryAction";
import Loader from "../../../layout/loader/Loader";
import { server_url } from "../../../../utils/Url";
import { Paginations } from "../../../../utils/Paginations";

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { loading, images, resultPerPage, imageCount, error } = useSelector(
    (state) => state.images
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectIds, setSelectIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleImageSelection = (index) => {
    setSelectIds((old) => [...old, index]);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(getAllImages(pageNumber));
  };

  function SelectImageIds(index) {
    const countMap = {};
    const evenStrings = [];
    const oddStrings = [];

    for (let i = 0; i < index.length; i++) {
      const str = index[i];
      countMap[str] = (countMap[str] || 0) + 1;
    }

    for (const key in countMap) {
      if (countMap[key] % 2 === 0) {
        evenStrings.push(key);
      } else {
        oddStrings.push(key);
      }
    }
    dispatch(getImageId(oddStrings));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    SelectImageIds(selectIds);
  }, [alert, error, dispatch, selectIds, currentPage]);

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        handleImageSelection={handleImageSelection}
        className={selectAll ? "gallery-image selected" : "gallery-image"}
      />
    ),
    [selectAll]
  );

  const imagesWithParams =
    images &&
    images.map((image) => {
      const updatedImage = {
        ...image,
        src: `${server_url()}/${image.path}`,
        width: 100,
        height: 100,
      };
      return updatedImage;
    });
  return (
    <>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Gallery photos={imagesWithParams} renderImage={imageRenderer} />
          </>
        )}
      </div>
      <div>
        {resultPerPage < imageCount && (
          <Paginations
            totalItemsCount={imageCount}
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default ImageGallery;
