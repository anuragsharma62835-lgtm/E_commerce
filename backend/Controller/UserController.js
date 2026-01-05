const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const getuser = async (req, res, next) => {
  try {
    const allusers = await User.find({});
    res.status(200).json({ message: "users", details: allusers });
  } catch (err) {
    next(err);
  }
};

// Get logged-in user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const createuser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const add = await User.findOne({ email });
    if (!add) {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const adduser = await User.create({
        name,
        email,
        password: hashedpassword,
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: adduser.email,
        subject: "Welcome to Ecommerce App 🎉",
        html: `<h2>Hello ${adduser.name}</h2>
       <p>Your account has been created successfully.</p>
       <p>Happy Shopping 🛒</p>`,
      });
      return res.status(201).json({
        message: "user created successfully",
        details: { name: adduser.name, email: adduser.email },
      });
    } else {
      return res.status(400).json({ message: "user already exists" });
    }
  } catch (err) {
    next(err);
  }
};

const loginuser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const login = await User.findOne({ email });
    if (login) {
      const comparepassword = await bcrypt.compare(password, login.password);

      if (comparepassword) {
        const token = jwt.sign(
          { _id: login._id, email: login.email, isAdmin: login.isAdmin },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: login.email,
          subject: "Welcome to Ecommerce App 🎉",
          html: `<h2>Hello ${login.name}</h2>
              <p>you have successfully logged In.</p>
              <p>Happy Shopping 🛒</p>`,
        });

        return res.status(200).json({
          message: "login succesfull",
          token,
          details: login,
        });
      } else {
        return res.status(401).json({ message: "password not matched" });
      }
    } else {
      return res.status(401).json({ message: "incorrect details" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getuser, createuser, loginuser, getProfile };
