import {
  LOCAL_OBJECT_SECRET_KEY,
  POST_API,
  VERIFY_TOKEN,
} from "../Services/api";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import CryptoJS from "crypto-js";
import { getLocalStorageObject } from "../Services/util";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        zIndex: 50,
      }}
    >
      <CircularProgress size={32} color="primary" />
    </div>
  );
};

const ProtectedRoute = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getLocalStorageObject("arogyaToken");
  const loggedInUser =
    user &&
    CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
  const userData = JSON.parse(loggedInUser);

  useEffect(() => {
    async function verifyTokenIsValid(token) {
      const verifyTokenData = await POST_API(VERIFY_TOKEN, { token: token });
      if (verifyTokenData?.valid) {
        setUserLoggedIn(true);
        // navigate('/');
        setLoading(false);
      } else {
        setUserLoggedIn(false);
        navigate("/sign-in");
        setLoading(false);
      }
    }

    if (userData?.token) {
      verifyTokenIsValid(userData?.token);
    } else {
      setUserLoggedIn(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />; // Display the loader while loading
  } else {
    return userLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  }
};

export default ProtectedRoute;
