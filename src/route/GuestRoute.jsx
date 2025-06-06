import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/login";

const GuestRoute = ({ children }) => {
  const { data, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;

  // Jika user sudah login, lempar ke /
  if (data) return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;
