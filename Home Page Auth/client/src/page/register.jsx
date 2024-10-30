import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import {
  Google,
  Facebook,
  Visibility,
  VisibilityOff,
  Person as User2,
} from "@mui/icons-material";
import "../styles/register.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/userAuth-slice";

const initialState = {
  userName: "",
  email: "",
  number: "",
  password: "",
};

export default function UserRegister() {
  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // capture redirect path
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFireBaseGoogleLogin = async () => {
    // Google login logic
  };

  const handleAnonymousLogin = () => {
    // Anonymous login logic
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (input.startsWith("+91") && input.length <= 13) {
      setPhoneNumber(input);
      setData({ ...data, number: input });
    }
  };

  const handleBlur = () => {
    if (phoneNumber === "+91") {
      setPhoneNumber("");
    }
  };

  const handleFocus = () => {
    if (!phoneNumber.startsWith("+91")) {
      setPhoneNumber("+91");
    }
  };

  const handleUserRegister = async () => {
    setLoading(true);
    try {
      const response = await dispatch(registerUser(data));
      if (response?.payload?.success) {
        console.log("User Registered");
        setData(initialState);
        const redirectPath = location.state?.from || "/home"; 
        console.log(redirectPath)
        navigate(redirectPath);
      } else {
        console.log("User not registered");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-register-container">
      <h4 className="user-register-heading">Your Company</h4>
      <p className="user-register-sign-up-text">Quick Sign Up with:</p>
      <div className="user-register-login-icons">
        <div
          onClick={handleFireBaseGoogleLogin}
          className="user-register-icon-box"
        >
          <Google style={{ fontSize: "2.8rem", color: "black" }} />
        </div>
        <div onClick={handleAnonymousLogin} className="user-register-icon-box">
          <Facebook style={{ fontSize: "3.4rem", color: "black" }} />
        </div>
      </div>
      <div className="user-login-separator">---- or ----</div>
      <form className="user-register-form">
        <TextField
          label="Name"
          placeholder="Enter your name"
          variant="outlined"
          size="small"
          name="userName"
          value={data.userName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          size="small"
          name="email"
          value={data.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mobile Number"
          placeholder="Enter your phone number"
          variant="outlined"
          size="small"
          name="number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          size="small"
          name="password"
          value={data.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <button
        className="user-register-button"
        onClick={handleUserRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="user-login-separator">---- or ----</div>
      <div className="user-login-box" onClick={handleAnonymousLogin}>
        <User2 style={{ fontSize: "2rem", color: "black" }} />
        <span style={{ color: "black" }}>Register Anonymously</span>
      </div>
    </div>
  );
}
