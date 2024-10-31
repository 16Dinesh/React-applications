import { Navigate, useLocation } from "react-router-dom";

export default function CheckUserAuth({
  isVerified = false,
  role = null,
  Loading = false,
  children,
}) {
  const location = useLocation();
  const redirectPath = location.state?.from || "/"; 

  if (Loading) {
    return <p>Loading...</p>;
  }

  if (!isVerified && !role) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }

  console.log("isAuthenticated:", isVerified);

  return <>{children}</>;
}
