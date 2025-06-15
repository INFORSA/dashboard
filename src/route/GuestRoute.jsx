import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/login";
import Loading from "../pages/loading/Loading";

const GuestRoute = ({ children }) => {
  const { data, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <Loading/>;

  // Jika user sudah login, lempar ke /
  if (data) return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;
