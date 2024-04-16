import React from "react";

const CreateSeo = ({ seoHandler, seoInputValue, submitHandler }) => {
  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <div className="input-field-area">
            <label>Title</label>
            <input
              type="text"
              name="seotitle"
              value={seoInputValue.seotitle}
              placeholder="Title"
              onChange={(e) => seoHandler(e)}
              />
          </div>
          <div className="input-field-area">
            <label>Keyword</label>
            <input
              type="text"
              placeholder="keyword"
              name="keyword"
              value={seoInputValue.keyword}
              onChange={(e) => seoHandler(e)}
            />
          </div>
          <div className="input-field-area">
            <label>Descrription</label>
            <input
              type="text"
              placeholder="metadec"
              name="metadec"
              value={seoInputValue.metadec}
              onChange={(e) => seoHandler(e)}
            />
          </div>
          <div className="input-field-area">
            <label>Meta link</label>
            <input
              type="text"
              placeholder="metalink"
              name="metalink"
              readOnly
              value={seoInputValue.metalink}
              onChange={(e) => seoHandler(e)}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSeo;
