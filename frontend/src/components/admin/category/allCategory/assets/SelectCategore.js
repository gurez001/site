import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  get_all_sub_categories,
} from "../../../../../actions/CategoreAction";

const SelectCategore = ({
  handleCheckboxChange,
  handleSubCheckboxChange,
  checkedItems,
  subcheckedItems,
}) => {
  const dispatch = useDispatch();
  const { allcategores } = useSelector((state) => state.Categore);
  const { all_sub_categores } = useSelector((state) => state.sub_Categore);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(get_all_sub_categories());
  }, [dispatch]);

  return (
    <>
      <ul className="category-ul">
        {allcategores &&
          allcategores.map((parentCategory, i) => (
            <li key={i} value={parentCategory._id}>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name={parentCategory.uuid}
                    onClick={() => handleCheckboxChange(i, parentCategory._id)}
                    checked={
                      checkedItems &&
                      checkedItems.includes &&
                      checkedItems.includes(parentCategory._id)
                    }
                    onChange={(event) => {}}
                  />
                  {parentCategory.name}
                </label>
              </div>

              <ul>
                {all_sub_categores &&
                  all_sub_categores.length > 0 &&
                  all_sub_categores &&
                  all_sub_categores
                    .filter(
                      (item) => item.Parent_category === parentCategory.uuid
                    )
                    .map((childCategory, j) => (
                      <li key={j} value={childCategory._id}>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name={childCategory._id}
                              onClick={() =>
                                handleSubCheckboxChange(j, childCategory._id)
                              }
                              checked={
                                subcheckedItems &&
                                subcheckedItems.includes &&
                                subcheckedItems.includes(childCategory._id)
                              }
                              onChange={(event) => {}}
                            />

                            {childCategory.name}
                          </label>
                        </div>
                      </li>
                    ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SelectCategore;
