import React, { useEffect } from "react";
import { Aside } from "../aside/Aside";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { FaUpRightFromSquare, FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/Loader";
import { ClearError, GetContactAction } from "../../../actions/ContactAction";

const GetContactDetails = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.contact);

  const contactCard = {
    display: "grid",
    gridTemplateColumns: "33% 33% 33%",
    gridRowGap: "20px",
    gridColumnGap: "20px",
  };

  const carddetails = {
    /* border: '1px solid', */
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError);
    }
    dispatch(GetContactAction());
  }, [alert, dispatch]);

  // const columns = [
  //     {
  //       field: "id",
  //       headerName: "id ",
  //       minWidth: 100,

  //     },
  //     {
  //       field: "name",
  //       headerName: "Name",
  //       minWidth: 150,

  //     },
  //     {
  //       field: "email",
  //       headerName:"Email",
  //       minWidth: 150,

  //     },
  //     {
  //       field: "subject",
  //       headerName: "Subject",
  //       minWidth: 150,

  //     //   renderCell: (params) => <TimeAgo time={params.value} />,
  //     },
  //     {
  //         field: "message",
  //         headerName: "Message",
  //         minWidth: 150,

  //       //   renderCell: (params) => <TimeAgo time={params.value} />,
  //       },
  //     {
  //       field: "action",
  //       headerName: "Action",
  //       type: "number",
  //       minWidth: 200,
  //       flex: 0.3,
  //       shortable: false,
  //       renderCell: (params) => {
  //         return (
  //           <>
  //             <NavLink
  //             //   to={`/admin/post/update/${params.getValue(params.id, "id")}`}
  //             >
  //               <FaUpRightFromSquare />
  //             </NavLink>

  //             <span
  //             //   onClick={() => deletehandler(params.getValue(params.id, "id"))}
  //             >
  //               <FaTrash />
  //             </span>
  //           </>
  //         );
  //       },
  //     },
  //   ];

  //   const rows = [];
  //   data &&
  //     data.forEach((item, i) => {
  //       rows.push({
  //         id: i+1,
  //         name: item.name,
  //         email: item.email,
  //         subject: item.subject,
  //         message:item.message
  //       });
  //     });

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <h2>contact details</h2>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div style={contactCard}>
                      {data &&
                        data.map((item, i) => (
                          <div style={carddetails}>
                            <strong
                              style={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              name:
                            </strong>
                            <p>{item.name}</p>
                            <strong
                              style={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              email:
                            </strong>
                            <p>{item.message}</p>
                            <strong
                              style={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              subject:
                            </strong>
                            <p>{item.subject}</p>
                            <strong
                              style={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              message:
                            </strong>
                            <p>{item.message}</p>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetContactDetails;
