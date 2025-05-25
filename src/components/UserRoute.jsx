import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function UserRoute() {
  const location = useLocation();
  const { user } = useSelector((state) => state.userSlice);
  return user ? <Outlet /> : <Navigate state={{ from: location }} to="/login" replace />
}
