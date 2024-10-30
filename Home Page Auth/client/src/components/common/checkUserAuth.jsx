import { Navigate, useLocation } from "react-router-dom";

export default function CheckUserAuth({
  isVerified,
  role,
  isLoading,
  children,
}) {
  const location = useLocation();
  const redirectPath = location.state?.from || "/"; 
  

  const isLoginOrRegister =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isVerified) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }




  return <>{children}</>;
}
