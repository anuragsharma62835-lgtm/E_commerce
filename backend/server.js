const express = require("express");
const app = express();
const path = require('path')
const cors = require('cors');
require("dotenv").config();
const passport = require('passport')
require('./Config/passport')
const upload = require("./middleware/upload")
const database = require("./Database/Database");
const userRoutes = require('./Routes/UserRoutes')
const productRoutes = require('./Routes/ProductRoutes')
// const cartroutes = require('./Routes/CartRoutes');
const apilimiter = require("./middleware/ratelimiter");
const errorhandler = require("./middleware/errorhandler");
const authRoutes = require("./Routes/AuthRoutes")
const orderRoutes = require('./Routes/OrderRoutes')
const adminRoutes = require("./Routes/adminroutes")

database;

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use('/api',apilimiter)
app.use(errorhandler);
app.use("/uploads", express.static("uploads"));
app.use('/api/product',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use("/api/order", orderRoutes);
app.use("/api/admin",adminRoutes)


app.get("/testingroute", async (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running perfectly on port :${PORT}`);
});