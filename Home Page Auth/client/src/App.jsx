import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import UserLoginsLayout from "./components/user/layout";
import UserLogin from "./page/login";
import UserRegister from "./page/register";
import UserForgotEmail from "./page/forgotEmail";
import UserOTP from "./page/otp";
import WelcomeHome from "./page/welcome";
import HomeLayout from "./components/Home/layout";
import HomeItems from "./page/items";
import Apple from "./page/fruits/apple";
import UserHomeLayout from "./components/dashboard/layout";
import Banana from "./page/fruits/bannsa";
import Orange from "./page/fruits/orange";
import Strawberry from "./page/fruits/strawberry";
import Grapes from "./page/fruits/grapes";
import Pineapple from "./page/fruits/pineapple";
import Watermelon from "./page/fruits/watermelon";
import Peach from "./page/fruits/peach";
import Kiwi from "./page/fruits/kiwi";
import Mango from "./page/fruits/mango";
import { useState } from "react";
import CheckUserAuth from "./components/common/checkUserAuth";
import TestGoogleAuth from "./Test/googleAuth";

function App() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  console.log(path);

  let isVerified = false;
  const isLoading = false;
  const role = null;

  return (
    <div>
      <Routes>
        {/* login routes */}
        <Route path="/auth" element={<UserLoginsLayout />}>
          {/* <Route index element={<Navigate to="/login" />} /> */}
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="forgot-user" element={<UserForgotEmail />} />
          <Route path="otp" element={<UserOTP />} />
        </Route>

        {/* dashBoard Routes */}
        <Route
          path="/home"
          element={
            <CheckUserAuth
              isVerified={isVerified}
              role={role}
              isLoading={isLoading}
            >
              <UserHomeLayout />
            </CheckUserAuth>
          }
        >
          <Route path="details" element={<WelcomeHome />} />
          <Route path="apple" element={<Apple />} />
          <Route path="banana" element={<Banana />} />
          <Route path="orange" element={<Orange />} />
          <Route path="strawberry" element={<Strawberry />} />
          <Route path="grapes" element={<Grapes />} />
          <Route path="pineapple" element={<Pineapple />} />
          <Route path="watermelon" element={<Watermelon />} />
          <Route path="peach" element={<Peach />} />
          <Route path="kiwi" element={<Kiwi />} />
          <Route path="mango" element={<Mango />} />
        </Route>

          {/* public routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomeItems isVerified={isVerified} />} />
        </Route>

        <Route path="/test-google-auth" element={<TestGoogleAuth/>}/>
      </Routes>
    </div>
  );
}

export default App;
