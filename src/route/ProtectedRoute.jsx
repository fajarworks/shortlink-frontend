import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const token = useSelector((state) => state.userState?.auth?.token);

  if (!token) {
    return <Navigate to="/landing" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;