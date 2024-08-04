import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

export default function AuthUserGuard() {
  const { isLogged, isUser } = useContext(AuthContext);

  if (!isLogged || !isUser()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}