import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SmallSpinner from "../components/SmallSpinner/SmallSpinner";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoutes = ({ children }) => {
   const { user, loader } = useContext(AuthContext);
   const location = useLocation();

   if (user) {
      return children;
   }

   if (loader) {
      return <SmallSpinner />;
   }

   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
