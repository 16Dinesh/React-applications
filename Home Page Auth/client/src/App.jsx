import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserHOmeLayout from "./components/Home/header";
import UserLoginsLayout from "./components/user/layout";
import UserLogin from "./page/login";
import UserRegister from "./page/register";
import UserForgotEmail from "./page/forgotEmail";
import UserOTP from "./page/otp";
import WelcomeHome from "./page/welcome";

function App() {
  return (
    <div>
      <Routes>

        {/* login routes */}
        <Route path="/" element={<UserLoginsLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegister/>}/>
          <Route path="forgot-user" element={<UserForgotEmail/>} />
          <Route path="otp" element={<UserOTP/>} />
        </Route>

        {/* homeRoutes */}
        <Route path="/" element={<UserHOmeLayout/>}>
            <Route path="home" element={<WelcomeHome/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
