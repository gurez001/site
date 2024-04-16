import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import { NavLink} from "react-router-dom";
import { Aside } from "../../aside/Aside";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import MetaData from "../../../layout/metaData/MetaData";
import CategoreForm from "./assets/CategoreForm";
import { Switch } from "@material-ui/core";
import CategoryTable from "./assets/CategoryTable";
import { getAllCategories, get_all_sub_categories } from "../../../../actions/CategoreAction";

const AllCategory = () => {
  // const Navigate = useNavigate();
  const dispatch = useDispatch();

  // const [checked, setChecked] = useState({});
  // const [subChecked, setSubChecked] = useState({});
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(get_all_sub_categories());
  }, []);

  // const handleChange = (id) => {
  //   const newCheckedState = !checked[id];
  //   setChecked((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  //   dispatch(StausCategory(id, newCheckedState));
  // };

  // const handleChangeSubCat = (id) => {
  //   const newCheckedState = !subChecked[id];
  //   setSubChecked((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));

  //   dispatch(StausSubCategory(id, newCheckedState));
  // };
  
  const columns = [
    {
      field: "id",
      headerName: "Product id",
      minWidth: 100,
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      width: 10,
    },

    {
      field: "description",
      headerName: "description",
      minWidth: 200,
      width: 10,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      width: 10,
      shortable: false,
      renderCell: (params) => {
        const rowStatus = params.row.status;
        return (
          <>
            <MetaData
              title={"Admin all product list"}
              content={"Admin all product list"}
              keywords={"Admin all product list"}
            />
            <NavLink
              to={`/admin/product/update-categorie/${params.row.parentid}`}
            >
              <FaUpRightFromSquare />
            </NavLink>
           
            <span
            // onClick={() =>
            //   deletehandler(params.getValue(params._id, "id"))
            // }
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const subColumns = [
    {
      field: "id",
      headerName: "Product id",
      minWidth: 100,
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      width: 10,
    },
    ,
    {
      field: "parent",
      headerName: "Parent",
      minWidth: 100,
      width: 10,
    },

    {
      field: "description",
      headerName: "description",
      minWidth: 200,
      width: 10,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 200,
      width: 10,
      shortable: false,
      renderCell: (params) => {
        const rowStatus = params.row.substatus;
        return (
          <>
            <MetaData
              title={"Admin all product list"}
              content={"Admin all product list"}
              keywords={"Admin all product list"}
            />
            <NavLink to={`/admin/update-sub-categorie/${params.row.subid}`}>
              <FaUpRightFromSquare />
            </NavLink>
           
            <span
            // onClick={() =>
            //   deletehandler(params.getValue(params._id, "id"))
            // }
            >
              <FaTrash />
            </span>
          </>
        );
      },
    },
  ];

  const rows = [];
  const rowsSub = [];
  // allcategores &&
  //   allcategores.forEach((item, i) => {
  //     rows.push({
  //       id: i + 1,
  //       parentid: item._id,
  //       name: item.name,
  //       description: item.description,
  //       status: item.categorystatus,
  //     });
  //     item.childs.forEach((subItem, j) => {
  //       rowsSub.push({
  //         id: j + 1,
  //         subid: subItem._id,
  //         name: subItem.name,
  //         parent: item.name,
  //         description: subItem.description,
  //         substatus: subItem.subcategorystatus,
  //       });
  //     });
  //   });
  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Admin All Products
        </title>
        <meta name="keywords" content="Admin All Products" />
      </Helmet>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Product category </h1>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <CategoreForm />
                      </div>
                      <div className="col-md-8">
                        <CategoryTable />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategory;
