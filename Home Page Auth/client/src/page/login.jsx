import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Phone, Google, Facebook } from "@mui/icons-material"; // Importing MUI icons

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Login logic here
  };

  const handleFormOTP = () => {
    navigate("/otp")
  };

  const handleGoogle = () => {
    // Google login logic here
  };

  const handleFacebook = () => {
    // Facebook login logic here
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="user-login-input"
          />
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="user-login-input"
          />
        </div>
        <div className="user-login-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <Link to="/forgot-user" className="user-login-forgot-link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <button className="user-login-button" onClick={handleLogin}>
        Login
      </button>
      <div className="user-login-separator">---- or ----</div>
      <div className="user-login-controllers">
        <div className="user-login-box" onClick={handleFormOTP}>
          <Phone className="user-login-icon" />
          <span>Login With OTP</span>
        </div>
        <div className="user-login-box" onClick={handleGoogle}>
          <Google className="user-login-icon" />
          <span>Login With Google</span>
        </div>
        <div className="user-login-box" onClick={handleFacebook}>
          <Facebook className="user-login-icon" />
          <span>Login With Facebook</span>
        </div>
      </div>
    </div>
  );
}
