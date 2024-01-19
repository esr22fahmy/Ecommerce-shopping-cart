import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/store";
import { Navigate } from "react-router-dom";

// childern => فيها كل ال component
export default function ProtectedRoute({ children }) {
  
  let { token } = useContext(AuthContext);
  // console.log(token);

  if (token === null) {
    // console.log('null tokennnn')
    return <Navigate to="/login" />;
  }



  return <>{children}</>;
}



