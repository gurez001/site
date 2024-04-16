import React, { useEffect } from "react";
import { Aside } from "../../aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllSeo } from "../../../../actions/SeoAction";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../../../layout/loader/Loader";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { TimeAgo } from "../../../layout/time/TimeAgo";

const AllSeo = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, seoData, error } = useSelector((state) => state.adminAllSeo);

  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(ClearError());
    }
    dispatch(getAllSeo());
  }, [dispatch, alert, error]);

  const columns = [
    {
      field: "id",
      headerName: "Seo id",
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Title",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 150,
    },
    {
      field: "typeid",
      headerName: "Type Id",
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,

      renderCell: (params) => <TimeAgo time={params.value} />,
    },
  ];

  const rows = [];
  seoData &&
    seoData.forEach((item, i) => {
      rows.push({
        id: item._id,
        name: item.metatitle,
        type: item.type,
        typeid: item.blogid ? item.blogid : item.productid,
        date: item.creditAt,
      });
    });

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>All Seo</h1>
                    </div>
                    <div className="productdata">
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          {seoData && seoData.length > 0 ? (
                            <>
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                // page={10}
                                disableSelectionOnClick
                                className="product-list-table"
                                autoHeight
                              />
                            </>
                          ) : (
                            <p>no data found</p>
                          )}
                        </>
                      )}
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

export default AllSeo;
