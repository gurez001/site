import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import { useSelector } from "react-redux";
import TimeAndDate from "../../layout/time/TimeAndDate";
import { Button } from "@material-ui/core";
import { server_url } from "../../../utils/Url";
export const Profile = () => {
  const Navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <>
          <div id="profile-page" className="profile-containor">
            <div className="prof-cont-row row space-between-center">
              <div
                style={{ marginTop: 10 }}
                className="user-profile-area col-md-5 "
              >
                <div className="user-prf-e">
                  <div className="profile-img spacer">
                    <img
                      src={
                        user && user.avatar && user.avatar.url
                          ? `${server_url()}/${user.avatar.url}`
                          : "/icon.png"
                      }
                      alt="User Avatar"
                    />
                  </div>
                  <Button
                    onClick={() => Navigate("/account/me/update")}
                    className="button-success spacer"
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
              <div style={{ marginTop: 10 }} className="ot-det col-md-7">
                <div className="userDetails">
                  <p class="xsm-font-size row">
                    <span className="col-md-6">
                      <b>Name :</b>
                    </span>
                    <span className="col-md-6">{user.name}</span>
                  </p>

                  <p class="xsm-font-size row">
                    <span className="col-md-6">
                      <b>Email </b>
                    </span>
                    <span className="col-md-6">{user.email}</span>
                  </p>
                  <p class="xsm-font-size row">
                    <span className="col-md-6">
                      <b>Joinig Date </b>
                    </span>
                    <span className="col-md-6">
                      <TimeAndDate time={user && user.date} />{" "}
                    </span>
                  </p>
                </div>

                <Button
                  onClick={() => Navigate("/account/password/update")}
                  className="button-success"
                >
                  Password update
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Data not found</p>
        </>
      )}
    </>
  );
};
