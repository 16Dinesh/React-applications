const jwt = require("jsonwebtoken");
const TestLoginUser = require("../../models/TestUsers");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config;

//Client ID for OAuth2Client
const CLIENT_SECRET_KEY = process.env.CLIENT_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Login with Google
const loginWithGoogle = async (req, res) => {
  try {
    const token = req.body.token;
    console.log("Received token:", token);

    // Verify the Google ID token
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const googleData = ticket.getPayload();
    console.log("Decoded Google data:", googleData);
    let user = await TestLoginUser.findOne({ email: googleData.email });
    console.log("user", user);

    if (!user) {
      user = new TestLoginUser({
        userName: googleData.name,
        email: googleData.email,
        googleVerified: true,
        photoURL: googleData.picture,
      });
      await user.save();
    }

    const tokenJWT = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    // res
    //   .cookie("token", jwtToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //   })
    //   .json({ success: true, message: "Logged in with Google", user });

    res.cookie("token", tokenJWT, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

// Register with email and password
const registerEmailUser = async (req, res) => {};

// Login with email and password
const loginEmailUser = async (req, res) => {};

// Login with Facebook
const loginWithFacebook = async (req, res) => {};

// Anonymous Login
const anonymousLogin = async (req, res) => {};

// Logout
const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully!" });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "unAuthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = {
  registerEmailUser,
  loginEmailUser,
  loginWithGoogle,
  loginWithFacebook,
  anonymousLogin,
  logoutUser,
  authMiddleware,
};
