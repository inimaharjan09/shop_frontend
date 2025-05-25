import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function AdminRoute() {
  const location = useLocation()
  const { user } = useSelector((state) => state.userSlice);

  return user?.role === 'Admin' ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}
