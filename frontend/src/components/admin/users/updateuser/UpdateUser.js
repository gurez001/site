import React, { useEffect, useMemo, useState } from "react";
import { Aside } from "../../aside/Aside";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../layout/loader/Loader";
import { UPDATE_USER_DETAILS_RESET } from "../../../../constants/UserConstants";
import {
  getUsersDetails,
  updateUserDetails,
  ClearError,
} from "../../../../actions/UserAction";
import MetaData from "../../../layout/metaData/MetaData";

export const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const Navigate = useNavigate();
  const { loading, error, user } = useSelector(
    (state) => state.adminUserDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.adminProfile);
  //------------------Singup Function--------------------

  const [singupValue, setsingupValue] = useState({
    name: "",
    email: "",
    role: "",
  });

  const profileUpdateHeandle = (e) => {
    const { name, value } = e.target;
    setsingupValue({ ...singupValue, [name]: value });
  };

  const singupSubmit = (e) => {
    e.preventDefault();

    const { name, email, role } = singupValue;
    const data = {
      name,
      email,
      role,
    };
    dispatch(updateUserDetails(id, data));
  };

  useMemo(() => {
    if (user && user._id !== id) {
      dispatch(getUsersDetails(id));
    }
  }, []);
  useEffect(() => {
    if (user) {
      setsingupValue({
        name: user && user.name,
        email: user && user.email,
        role: user && user.role,
      });
    }
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(ClearError());
    }
    if (isUpdated) {
      alert.success("user updated");
      Navigate("/admin/users");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
    }
  }, [
    alert,
    dispatch,
    user,
    Navigate,
    id,
    isUpdated,
    updateError,
    isDeleted,
    error,
  ]);

  return (
    <>
      <MetaData
        title={"Admin user updat"}
        content={"Admin user updat"}
        keywords={"Admin user updat"}
      />
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Create products</h1>
                    </div>
                    {updateLoading ? (
                      <Loader />
                    ) : (
                      <>
                        <div>
                          <form
                            className="login-form"
                            onSubmit={singupSubmit}
                            encType="multipart/from-data"
                          >
                            <div className="input-list">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                name="name"
                                autoComplete="on"
                                id="name-input"
                                value={singupValue.name}
                                onChange={profileUpdateHeandle}
                              />
                            </div>
                            <div className="input-list">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                name="email"
                                autoComplete="on"
                                id="eamil"
                                value={singupValue.email}
                                onChange={profileUpdateHeandle}
                              />
                            </div>
                            <div className="input-list">
                              <label htmlFor="role">Role</label>
                              <select
                                name="role"
                                value={singupValue.role}
                                onChange={profileUpdateHeandle}
                              >
                                <option value="">Choose role</option>
                                <option value="admin">Admin</option>
                                <option value="role">User</option>
                              </select>
                            </div>

                            <div className="input-list">
                              <Button
                                disabled={
                                  updateLoading
                                    ? true
                                    : false || singupValue.role === ""
                                    ? true
                                    : false
                                }
                                type="submit"
                                value="Singup"
                              >
                                Singup
                              </Button>
                            </div>
                          </form>
                        </div>
                      </>
                    )}
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

export default UpdateUser;
