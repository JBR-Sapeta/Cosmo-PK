import { useUser } from '@Store/auth';
import { ROUTER_PATH } from './constant';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { authData } = useUser();

  if (authData) {
    return <Navigate to={ROUTER_PATH.HOME} />;
  }

  return <Outlet />;
}
