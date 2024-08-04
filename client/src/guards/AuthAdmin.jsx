import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

export default function AuthAdminGuard() {
  const { isLogged, isAdmin } = useContext(AuthContext);

  if (!isLogged || !isAdmin()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
