import "../styles/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Phone, Facebook } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { googleUser, loginUser } from "../store/userAuth-slice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const initialData = {
  email: "",
  password: "",
};

const G_initialData = {
  name: "",
  email: "",
  email_verified: false,
  picture: "",
};

export default function UserLogin() {
  const [formData, setFormData] = useState(initialData);
  const [googleData, setGoogleData] = useState(G_initialData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLoginBTN = async () => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(formData));
      if (response?.payload?.success) {
        setFormData(initialData);
        const redirectPath = location.state?.from || "/home";
        navigate(redirectPath);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormOTP = () => {
    navigate("/auth/otp");
  };

  const handleFacebook = () => {
    console.log("Facebook login clicked");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleGoogleSuccess = (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   const userData = jwtDecode(token);
  //   console.log("Decoded User Data:", userData);
  // };

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   console.log(token);
  //   setLoading(true);
  //   try {
  //     const userData = jwtDecode(token); // Decode the JWT
  //     console.log("Decoded User Data:", userData); // Log decoded user data

  //     const receivedData = {
  //       name: userData.name,
  //       email: userData.email,
  //       email_verified: userData.email_verified,
  //       picture: userData.picture,
  //     };
  //     googleData(receivedData);
  //     const response = await dispatch(googleUser(googleData));
  //     if (response?.payload?.success) {
  //       setFormData(G_initialData);
  //       const redirectPath = location.state?.from || "/home";
  //       navigate(redirectPath);
  //     } else {
  //       console.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //   }
  // };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const token = credentialResponse.credential;
      const userData = jwtDecode(token);

      const receivedData = {
        name: userData.name,
        email: userData.email,
        email_verified: userData.email_verified,
        picture: userData.picture,
      };
      setGoogleData(receivedData);

      const response = await dispatch(googleUser(receivedData));
      if (response?.payload?.success) {
        setGoogleData(G_initialData);
        navigate(location.state?.from || "/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <h4 className="user-login-header">Company Title</h4>
      <div className="user-login-textFields">
        <div className="user-login-inputs">
          <input
            placeholder="Enter your email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            className="user-login-input"
          />
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="user-login-input"
          />
        </div>
        <div className="user-login-options">
          <label>
            <input type="checkbox" name="rememberMe" /> Remember Me
          </label>
          <Link to="/auth/forgot-user" className="user-login-forgot-link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <button
        className="user-login-button"
        onClick={handleLoginBTN}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="user-login-separator">---- or ----</div>
      <div className="user-login-controllers">
        <div className="user-login-box" onClick={handleFormOTP}>
          <Phone className="user-login-icon" />
          <span style={{ color: "black" }}>Sign in with OTP</span>
        </div>
        <div
          className="google-login-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Google Login Failed");
            }}
            type="standard"
            theme="filled_blue"
            size="large"
            shape="rectangular"
            width="250px"
            logo_alignment="center"
            login_uri="/auth/login"
            context="signin"
            useOneTap
            auto_select
          />
        </div>
        <div className="user-login-box" onClick={handleFacebook}>
          <Facebook className="user-login-icon" />
          <span style={{ color: "black" }}>Sign in with Facebook</span>
        </div>
      </div>
    </div>
  );
}
