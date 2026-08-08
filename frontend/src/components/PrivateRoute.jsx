import React from "react";
import { Navigate } from "react-router-dom";

// Renders the protected page only if a token exists, otherwise redirects to /login
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
