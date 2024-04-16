import React, { useState } from 'react'
import CreateSeo from '../../seo/create/CreateSeo'

const ImageAside = ({images}) => {

    const [seoInputValue, setSeoInputValue] = useState({
        seotitle: "",
        keyword: "",
        metadec: "",
        metalink: "",
      });

      const seoHandler = (e) => {
        const { name, value } = e.target;
    
        setSeoInputValue({ ...seoInputValue, [name]: value });
      };

      const createImageSeo = ()=>{}

  return (
    <>
      <CreateSeo
       seoInputValue={seoInputValue}
       seoHandler={seoHandler}
       submitHandler={createImageSeo}
      />
    </>
  )
}

export default ImageAside
