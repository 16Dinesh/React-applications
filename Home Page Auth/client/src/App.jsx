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
import { useEffect, useState } from "react";
import TestGoogleAuth from "./Test/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./store/userAuth-slice/index";
import CheckUserAuth from "./components/common/checkUserAuth" 

function App() {
  const { role, isVerified, Loading } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

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
              Loading={Loading}
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

        <Route path="/test-google-auth" element={<TestGoogleAuth />} />
      </Routes>
    </div>
  );
}

export default App;
