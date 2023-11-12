import { useUser } from '@Store/auth';
import { ROUTER_PATH } from './constant';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { user } = useUser();

  if (user) {
    return <Navigate to={ROUTER_PATH.HOME} />;
  }

  return <Outlet />;
}
