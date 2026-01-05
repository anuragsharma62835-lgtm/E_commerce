const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
require("./Config/passport");
const upload = require("./middleware/upload");
const database = require("./Database/Database");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const apilimiter = require("./middleware/ratelimiter");
const errorhandler = require("./middleware/errorhandler");
const authRoutes = require("./Routes/AuthRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const adminRoutes = require("./Routes/adminroutes");

database();

app.use(
  cors({
    origin: [
      "https://e-commerce-5jru.vercel.app",
      "http://localhost:5173",
      "https://e-commerce-git-main-anurags-projects-6158872e.vercel.app",
     ] ,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use("/api", apilimiter);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorhandler);

app.get("/", async (req, res) => {
  res.send("working");
});

app.listen(5000, () => {
  console.log("server running");
});
// module.exports = app;