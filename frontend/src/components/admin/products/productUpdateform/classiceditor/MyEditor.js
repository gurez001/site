import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const MyEditor = ({ event,valuedata,getData }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, 
  };


  const getdata =(e)=>{
    getData(e)
  }

  return (
    <div className="App">
      <JoditEditor
        ref={editor}
        value={valuedata}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={getdata} // preferred to use only this option to update the content for performance reasons
      />
    </div>
  );
};

export default MyEditor;
