import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Google, Facebook, Visibility, VisibilityOff, Person as User2 } from "@mui/icons-material"; 
import "../styles/register.css"

const initialState = {
  userName: "",
  email: "",
  number: "",
  password: ""
};

export default function UserRegister() {
  const [data, setData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="user-register-container">
      <h4 className="user-register-heading">
        Welcome to <span className="user-register-highlight">Green Assist!</span>
      </h4>
      <p className="user-register-subtext">
        Register now and connect with our expert team for all your home needs
      </p>
      <p className="user-register-sign-up-text">Quick Sign Up with:</p>
      <div className="user-register-login-icons">
        <div onClick={handleFireBaseGoogleLogin} className="user-register-icon-box">
          <Google style={{ fontSize: "2.8rem" }} />
        </div>
        <div onClick={handleAnonymousLogin} className="user-register-icon-box">
          <Facebook style={{ fontSize: "3.4rem" }} />
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
          value={data.number}
          onChange={handleChange}
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
      <button className="user-register-button" onClick={() => navigate("/home")}>
        Register
      </button>
      <div className="user-login-separator">---- or ----</div>
      <div className="user-login-box" onClick={handleAnonymousLogin}>
        <User2 style={{ fontSize: "2rem" }} />
        <span>Register Anonymously</span>
      </div>
    </div>
  );
}
