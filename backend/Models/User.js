const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isAdmin:{
      type:Boolean,
      default:false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", UserSchema);
// (user)
