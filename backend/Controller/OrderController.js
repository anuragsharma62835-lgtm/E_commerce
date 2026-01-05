const Order = require("../Models/Order");
const Product = require("../Models/Product");

const createOrder = async (req, res) => {
  try {
    const { products, paymentMethod } = req.body;
    const userId = req.user;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    let totalAmount = 0;
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      totalAmount += product.price * (item.quantity || 1);
    }

    const orderProducts = products.map((p) => ({
      product: p.product,
      quantity: p.quantity || 1,
    }));

    const newOrder = await Order.create({
      user: userId,
      products: orderProducts,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

module.exports = { createOrder, getOrders };
