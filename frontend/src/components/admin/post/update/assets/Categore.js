import React, { useState } from "react";
import { useSelector } from "react-redux";

const Categore = ({ setSelectedCategoryId, selectedCategoryId }) => {

  console.log(selectedCategoryId)
  const { loading, category, error } = useSelector(
    (state) => state.allBlogCategore
  );
  const [checkedItems, setCheckedItems] = useState(null);

  const handleCheckboxChange = (itemIndex, id) => {
    if (itemIndex !== checkedItems) {
      setSelectedCategoryId(id);
    } else {
      setSelectedCategoryId("");
    }
    setCheckedItems(itemIndex === checkedItems ? null : itemIndex);
  };

  return (
    <>
      <div>
        <h3>Categories</h3>
        <div>
          {category &&
            category.map((item, i) => (
              <div className="right-category" key={i}>
                <label>
                  <input
                    type="checkbox"
                    name={item._id}
                    value={selectedCategoryId}
                    onClick={() => handleCheckboxChange(i, item._id)}
                    checked={selectedCategoryId === item._id}
                    onChange={(event) => { }}
                    disabled={selectedCategoryId !== item._id && selectedCategoryId !== ""}
                  />
                  {item.name}
                </label>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Categore;