import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const admin = localStorage.getItem("loggedInAdmin");

  if (!admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;