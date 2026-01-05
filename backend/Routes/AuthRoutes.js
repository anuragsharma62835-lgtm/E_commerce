const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { forgotPassword, resetPassword}= require('../Controller/AuthController')

// Step 1: Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google sends user back here
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { _id } = req.user;

    const token = jwt.sign({_id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    const redirectURL = `http://localhost:5173/oauth-success?token=${token}&isAdmin=${req.user.isAdmin}&name=${req.user.name}&email=${req.user.email}`;

    res.redirect(redirectURL)
  }
);
//forgot passwrod
router.post('/forgot-password',forgotPassword);

//reset password
router.post('/reset-password/:token',resetPassword)

module.exports = router;
