import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/login";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
