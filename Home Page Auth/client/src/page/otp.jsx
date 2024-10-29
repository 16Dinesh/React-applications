import { TextField } from "@mui/material";
import { useState } from "react";
import "../styles/otp.css";

export default function UserOTP() {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  function handleOTPBTN() {
    // Simulating OTP sent state (replace with actual OTP sending logic)
    setOtpSent(true);
  }

  function verifyOTP() {
    // OTP verification logic here
    console.log("OTP verified!");
  }

  const handleBlur = () => {
    if (phoneNumber === "+91") {
      setPhoneNumber("");
    }
  };

  const handleFocus = () => {
    if (!phoneNumber) {
      setPhoneNumber("+91");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (input.startsWith("+91") && input.length <= 13) {
      setPhoneNumber(input);
    }
  };

  return (
    <div className="user-otp-container">
      <h4 className="user-otp-heading">
        Company Name
      </h4>
      <p className="user-otp-subtext">
        Log into your account using your phone number
      </p>
      <div className="user-otp-input-container">
        <TextField
          label="Number"
          placeholder="Enter your number after +91"
          variant="outlined"
          size="small"
          margin="normal"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{ mb: 2, width: 370 }}
        />
        <button className="user-otp-button" onClick={handleOTPBTN}>
          Submit
        </button>
        <div id="recaptcha-container"></div>
        {otpSent && (
          <>
            <TextField
              label="Enter OTP"
              placeholder="Enter your OTP"
              variant="outlined"
              size="small"
              margin="normal"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              sx={{ mb: 2, width: 370 }}
            />
            <button className="user-otp-button" onClick={verifyOTP}>
              Verify OTP
            </button>
          </>
        )}
      </div>
      
    </div>
  );
}
