import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthContext";

export default function AuthGuard() {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}