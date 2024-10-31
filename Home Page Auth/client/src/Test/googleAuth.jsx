import { useGoogleOneTapLogin, googleLogout } from "@react-oauth/google";
import "./test.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { googleUser } from "../store/userAuth-slice";
import { useLocation, useNavigate } from "react-router-dom";

export default function TestGoogleAuth() {
  const [userCredential, setUserCredential] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      const { credential } = credentialResponse;
      setUserCredential(credential);
      console.log("Credential:", credential);

      // Dispatch the action directly with credential as payload
      const response = await dispatch(googleUser({ token: credential }));
      if (response?.payload?.success) {
        const redirectPath = location.state?.from || "/home";
        navigate(redirectPath);
      } else {
        console.error("Login failed");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div>
      <div className="text-layout">
        <div>Google login</div>
        <div>
          <button onClick={() => googleLogout()}>LogOut</button>
        </div>
      </div>
    </div>
  );
}
