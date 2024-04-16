import React, { useState } from "react";
import { useSelector } from "react-redux";

const Categore = ({ setSelectedCategoryId}) => {
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
                  onClick={() => handleCheckboxChange(i, item._id)}
                  checked={checkedItems === i}
                  onChange={(event) => {}}
                  disabled={checkedItems !== i && checkedItems !== null}
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
