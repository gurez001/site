import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Import the default styles
import { server_url } from "../../../utils/Url";

const ImageLightbox = ({ product_images }) => {
  if (!Array.isArray(product_images)) {
    return null; // Or display a message indicating no images available
  }
  
  const images =
    product_images &&
    product_images.map((image) => ({
      original: `${server_url()}/${image.path}?w=1000?h=1000`, // Use the path property as the 'original' image URL
      thumbnail: `${server_url()}/${image.path}`, // You can also use the same URL for thumbnails
      // description: image.originalname, // Use originalname as description
    }));


  return <>{<ImageGallery items={images} />}</>;
};

export default ImageLightbox;
