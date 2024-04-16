import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Loader from "../layout/loader/Loader";

export const ProtectedRoute = (props) => {
  const { Component } = props;
  const data = props.isAdmin;
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const { success, message, error } = useSelector((state) => state.forgetPassword);
  const navigate = useNavigate();

  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    // Set up Axios interceptor
    const interceptor = axios.interceptors.request.use((config) => {
      config.withCredentials = true;
      return config;
    });

    // Clean up the interceptor when the component is unmounted
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setPageLoad(false);
    }
  
    if (!loading && !isAuthenticated) {
      navigate("/sign-in");
      return;
    }
   
    // if (isAuthenticated && user && !user.verified) {
    //   navigate("/otp-verification");
    //   return; // Add return to avoid further checks
    // }

    if (data === true && user && user.role !== "admin") {
      navigate("/404");
      return;
    }
  }, [setPageLoad, loading, isAuthenticated, data, user, navigate]);

  return <>{pageLoad ? <Loader /> : <Component />}</>;
};


// export const ProtectedRoute = ({component:Component,...rest}) => {
//   const navigate = useNavigate();
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);

//   return(
//     <>
//       {!loading&&(
//         <Route
//         {...rest}
//         render={(props)=>{
//           if(!isAuthenticated){
//            return navigate('/')
//           }
//           return <Component {...props}/>
//         }}
//         />
//       )}
//     </>
//   );
// };
