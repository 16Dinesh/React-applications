const jwt = require("jsonwebtoken");
const TestLoginUser = require("../../models/TestUsers");

// Register with email and password
const registerEmailUser = async (req, res) => {
  const { userName, email, number, password } = req.body;

  const checkUser = await TestLoginUser.findOne({ email });
  if (checkUser) {
    return res.json({
      success: false,
      message: "User already exists with the same email! Please try again",
    });
  }

  try {
    const newUser = new TestLoginUser({
      userName,
      email,
      number,
      password,
      role,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

// Login with email and password
const loginEmailUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await TestLoginUser.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }
    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Wrong password entered",
      });
    }

    const tokenExpiry = rememberMe ? "7d" : "60m";
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: tokenExpiry }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
      })
      .json({
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
    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

// Login with Google
const loginWithGoogle = async (req, res) => {
  
  try {
    // Verify Google token here using Google API (omitted for brevity)
    // const googleData = { email: "user@gmail.com", name: "Google User" }; // Replace with actual verified data

    let user = await TestLoginUser.findOne({ email: googleData.email });
    if (!user) {
      user = new TestLoginUser({
        userName: googleData.name,
        email: googleData.email,
        googleVerified: true,
      });
      await user.save();
    }


    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logged in with Google", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

// Login with Facebook
const loginWithFacebook = async (req, res) => {
  const { accessToken } = req.body; // Assuming the Facebook access token is sent in the body

  try {
    // Verify Facebook token here using Facebook API (omitted for brevity)
    const facebookData = { email: "user@facebook.com", name: "Facebook User" }; // Replace with actual verified data

    let user = await TestLoginUser.findOne({ email: facebookData.email });
    if (!user) {
      user = new TestLoginUser({
        userName: facebookData.name,
        email: facebookData.email,
        facebookVerified: true,
      });
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logged in with Facebook", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Facebook login failed" });
  }
};

// Anonymous Login
const anonymousLogin = async (req, res) => {
  try {
    const user = new TestLoginUser({
      userName: "Anonymous",
      anonymous: true,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role, userName: user.userName },
      "CLIENT_SECRET_KEY",
      { expiresIn: "30m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logged in anonymously", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Anonymous login failed" });
  }
};

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
  authMiddleware
};
