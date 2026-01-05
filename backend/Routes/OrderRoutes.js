const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../Controller/OrderController");
const {protect} = require("../middleware/authmiddleware"); 

router.post("/create", protect, createOrder);

router.get("/allorder", protect, getOrders);

module.exports = router;
