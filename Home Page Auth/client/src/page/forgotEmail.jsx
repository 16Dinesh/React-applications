import "../styles/Femail.css";
import { TextField } from "@mui/material";

export default function UserForgotEmail() {
  return (
    <div className="user-forgot-email-container">
      <h4 className="user-forgot-email-heading">Forgot Password?</h4>
      <p className="user-forgot-email-subtext">
        No worries! Enter the email address associated with your account, and
        we'll send you a link to reset your password.
      </p>
      <div className="user-forgot-email-input-container">
        <TextField
          label="Email"
          placeholder="Enter your email"
          variant="outlined"
          size="small"
          margin="normal"
          sx={{ mb: 2, width: 370 }}
          name="email"
        />
      </div>
      <div className="user-forgot-email-button-container">
        <button className="user-forgot-email-submit-button">Submit</button>
      </div>
    </div>
  );
}
