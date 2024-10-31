const express = require("express");
const {
  registerEmailUser,
  loginEmailUser,
  loginWithGoogle,
  loginWithFacebook,
  anonymousLogin,
  logoutUser,
  authMiddleware
} = require("../../controllers/userAuth/auth-controller");

const router = express.Router();
router.post("/register", registerEmailUser);
router.post("/login", loginEmailUser);
router.post("/google", loginWithGoogle);
router.post("/facebook", loginWithFacebook);
router.post("/anonymous", anonymousLogin);
router.post("/logout", logoutUser);
router.get("/check-user", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
