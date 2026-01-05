const express = require("express");
const crypto = require("crypto");
const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // genertae reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    // save to db with expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // 4️⃣ Create reset URL
    const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

    // 5️⃣ Send email
    await sendEmail(
      user.email,
      "Password Reset Request",
      `
      <h3>Password Reset</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 10 minutes</p>
      `
    );

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // 1️⃣ Hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // 2️⃣ Find user by token + expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3️⃣ Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4️⃣ Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = { forgotPassword, resetPassword };
