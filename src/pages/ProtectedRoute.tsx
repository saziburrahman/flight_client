import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
