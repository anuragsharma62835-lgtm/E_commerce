const Products = require("../Models/Product");

const getproduct = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 10;
    const skip = (page-1)*limit
    const allproducts = await Products.find().skip(skip).limit(limit);
    const totalproducts = await Products.countDocuments();

    res.status(201).json({ message: "products", details: allproducts,page,totalpages:Math.ceil(totalproducts/limit) });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error fetching the products", details: error.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // get product ID from URL
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message:'your product here ', details: product });
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

const createproduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { image } = req.file;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const add = await Products.findOne({ name });
    if (!add) {
      const addProduct = await Products.create({
        name,
        description,
        price,
        image: `/uploads/${req.file.filename}`,
      });
      return res
        .status(201)
        .json({ message: "product created successfully", details: addProduct });
    } else {
      return res
        .status(400)
        .json({ message: "product already exists", details: add });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "error creatng the product", details: error.message });
  }
};



module.exports = { getproduct, createproduct,getProductById };
