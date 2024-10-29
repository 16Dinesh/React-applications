import { Link, Outlet, useLocation } from "react-router-dom";
import "./userLayout.css";

export default function UserLoginsLayout() {
    const location = useLocation();
  const isUserPage = location.pathname.includes("login");
  const isRegisterPage = location.pathname.includes("register");

  console.log(location.pathname);
    return (
        <>
        <div className="user-login-Layout">
        <div className="user-login-inside-Layout">
          <Outlet />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop:"1rem", paddingBottom:"2rem"}}>
        {isUserPage ? (
          <>
            Don't have an account? <Link to='/register' >Register Now</Link>
          </>
        ) : isRegisterPage ? (
          <>
            Have an account? <Link to='/login'>Login now</Link>
          </>
        ) : null}
      </div>
        </>
    )
}