import React from 'react'
import { Helmet } from "react-helmet";
const MetaData = ({title,keywords,content}) => {
  return (
   <>
    <Helmet>
        
        <title>{title}</title>
        <meta name="description" content={content}/>
        <meta name="keywords" content={keywords} />
        {/* <meta name="viewport" content={content} /> */}
      </Helmet>
   </>
  )
}

export default MetaData