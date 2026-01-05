const Order = require("../Models/Order");
const Product = require("../Models/Product");
const User = require("../Models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ message: "users loaded successfully", details: users });
  } catch (error) {
    res.status(500).json({ message: "error", details: error.message });
  }
};

exports.getproducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "all products here", details: products });
  } catch (error) {
    res.status(500).json({ message: "error", details: error.message });
  }
};

// if user wants to delete his account
exports.deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteed = await User.findByIdAndDelete(id);
    if (!deleteed) {
      return res.status(404).json({ message: "user not found" });
    }
    const { password, isAdmin, _id, ...userWithoutSensitive } =
      deleteed.toObject();
    res
      .status(200)
      .json({
        message: "user deleted successfully",
        details: userWithoutSensitive,
      });
  } catch (err) {
    next(err);
  }
};

exports.getallOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res
      .status(200)
      .json({ message: "orders loaded successfully", details: orders });
  } catch (error) {
    res.status(500).json({ message: "error", details: error.message });
  }
};

exports.deleteproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedproduct = await Product.findByIdAndDelete(id);
    if (!deletedproduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
      .json({
        message: "product deleted successfully",
        details: deletedproduct,
      });
  } catch (err) {
    next(err);
  }
};

exports.newProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file.path;
    const product = await Product.create({
      name,
      price,
      description,
      image,
    });
    res
      .status(200)
      .json({ message: "product created successfully", details: product });
  } catch (error) {
    res.status(500).json({ message: "error", details: error.message });
  }
};

exports.everything = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    res
      .status(200)
      .json({ message: "loading done", details: {users, orders, products} });
  } catch (error) {
    res.status(400).json({ message: "server error" });
  }
};
