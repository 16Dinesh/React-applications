import "../styles/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Phone, Google, Facebook } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userAuth-slice";

const initialData = {
  email: "",
  password: "",
};

export default function UserLogin() {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(formData));
      if (response?.payload?.success) {
        setFormData(initialData);
        const redirectPath = location.state?.from || "/home";
        console.log(redirectPath);
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

  const handleGoogle = () => {
    // Placeholder for Google login logic
    console.log("Google login clicked");
  };

  const handleFacebook = () => {
    // Placeholder for Facebook login logic
    console.log("Facebook login clicked");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <input type="checkbox" /> Remember Me
          </label>
          <Link to="/auth/forgot-user" className="user-login-forgot-link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <button
        className="user-login-button"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="user-login-separator">---- or ----</div>
      <div className="user-login-controllers">
        <div className="user-login-box" onClick={handleFormOTP}>
          <Phone className="user-login-icon" />
          <span style={{ color: "black" }}>Login With OTP</span>
        </div>
        <div className="user-login-box" onClick={handleGoogle}>
          <Google className="user-login-icon" />
          <span style={{ color: "black" }}>Login With Google</span>
        </div>
        <div className="user-login-box" onClick={handleFacebook}>
          <Facebook className="user-login-icon" />
          <span style={{ color: "black" }}>Login With Facebook</span>
        </div>
      </div>
    </div>
  );
}
