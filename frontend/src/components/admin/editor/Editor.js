import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ value, event }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  //   useEffect(() => {
  //     if (value) {
  //       setContent(value);
  //     }
  //   });
  const contentHeandle = (e) => {
    setContent(e);
  };
  console.log(content);
  return (
    <div>
      <div className="App">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => contentHeandle(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </div>
    </div>
  );
};

export default Editor;
