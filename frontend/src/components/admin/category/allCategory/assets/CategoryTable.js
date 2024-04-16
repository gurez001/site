import React from "react";

import { NavLink } from "react-router-dom";
import { FaUpRightFromSquare } from "react-icons/fa6";
import DataGridTable from "../../../../../utils/DataGridTable";
import { server_url } from "../../../../../utils/Url";
import { useSelector } from "react-redux";

const CategoryTable = () => {
  const { allcategores } = useSelector((state) => state.Categore);
  const { all_sub_categores } = useSelector((state) => state.sub_Categore);
 
  const columns = [
    {
      field: "id",
      headerName: "No",
      width: 50,
    },
    {
      field: "img",
      headerName: "Image",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <img
              width={"50px"}
              height={"50px"}
              src={
                params.row.img !== null
                  ? `${server_url()}/${params.row.img}`
                  : `/placeholder.webp`
              }
              alt="placeholder"
            />
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 50,
      maxWidth: 50,
      renderCell: (params) => {
        return (
          <>
            <NavLink 
              className={"link-color"}
              to={`/admin/product/update-categorie/${params.row.uuid}`}
            >
              {params.row.name}
            </NavLink>
          </>
        );
      },
    },
    {
      field: "parent",
      headerName: "Parent",
      width: 130,
    },
    {
      field: "description",
      headerName: "Description",
      width: 130,
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 120,
    },
    {
      field: "count",
      headerName: "Count",
      type: "number",
      width: 120,
      shortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/product/update-categorie/${params.row.uuid}`}>
              <FaUpRightFromSquare />
            </NavLink>
          </>
        );
      },
    },
  ];
  const rows = [];

// Function to add rows to the 'rows' array
const addRowsFromCategories = (categories, sub_Categore) => {
 
const cat = [...categories,...sub_Categore]
cat.forEach((item, i) => {
    // if (item.isdelete !== true) {
      let parentName = ''; 
 
    const parentCategory = cat.find(category => category.uuid === item.Parent_category);
    if (parentCategory) {
        parentName = parentCategory.name; // Set parentName to the name of the parent category
    }
      rows.push({
        id: i + 1,
        name: item.name,
        parent:parentName,
        img: item.thumbnail && item.thumbnail.path,
        uuid: item.uuid,
        description: item.description,
        slug: item.slug,
      });
    // }
  });
};

// Add rows from main categories
if (Array.isArray(allcategores) && Array.isArray(all_sub_categores)) {
  addRowsFromCategories(allcategores && allcategores,all_sub_categores && all_sub_categores);
}

// Add rows from sub categories



  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "No",
  //     width: 50,
  //   },
  //   {
  //     field: "img",
  //     headerName: "Image",
  //     width: 120,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <img
  //             width={"50px"}
  //             height={"50px"}
  //             src={
  //               params.row.img !== null
  //                 ? `${server_url()}/${params.row.img}`
  //                 : `/placeholder.webp`
  //             }
  //             alt="placeholder"
  //           />
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 50,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <NavLink
  //             className={"link-color"}
  //             to={`/admin/product/update-categorie/${params.row.uuid}`}
  //           >
  //             {params.row.name}
  //           </NavLink>
  //         </>
  //       );
  //     },
  //   },

  //   {
  //     field: "description",
  //     headerName: "Description",
  //     width: 130,
  //   },
  //   {
  //     field: "slug",
  //     headerName: "Slug",
  //     width: 120,
  //   },
  //   {
  //     field: "count",
  //     headerName: "Count",
  //     type: "number",
  //     width: 120,
  //     shortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <>
  //           <NavLink to={`/admin/product/update-categorie/${params.row.uuid}`}>
  //             <FaUpRightFromSquare />
  //           </NavLink>
  //         </>
  //       );
  //     },
  //   },
  // ];
  // const rows = [];
  // if (Array.isArray(allcategores)) {
  //   allcategores &&
  //     allcategores.forEach((item, i) => {
  //       if (item.isdelete !== true) {
  //         rows.push({
  //           id: i + 1,
  //           name: item.name,
  //           img: item.thumbnail && item.thumbnail.path,
  //           uuid: item.uuid,
  //           description: item.description,
  //           slug: item.slug,
  //         });
  //       }
  //     });
  // }

  return (
    <>
      <div id="parent-category" className="categore-coll">
        <div className="productdata datagrid-table-overflow cat-headwer-cont">
          <DataGridTable rows={rows} columns={columns} />
          {/* <DataGridTable rows={rows} columns={columns} /> */}
        </div>
      </div>
    </>
  );
};

export default CategoryTable;
