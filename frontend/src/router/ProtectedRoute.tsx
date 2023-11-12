import { useAuth } from '@Store/auth';
import { ROUTER_PATH } from './constant';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTER_PATH.SIGN_IN} />;
  }

  return <Outlet />;
}
