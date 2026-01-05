const express = require("express");
const { getAllUsers, getallOrders, newProduct, deleteuser, deleteproduct, everything, getproducts } = require("../Controller/Admincontroller");
const { protect, adminOnly } = require("../middleware/authmiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/orders", protect, adminOnly, getallOrders);
router.get('/products',protect,adminOnly,getproducts)
router.get('/everything',protect,adminOnly,everything)
router.post("/new",protect,adminOnly,upload.single("image"),newProduct)
router.delete("/deleteuser/:id",protect,adminOnly,deleteuser)
router.delete("/deleteproduct/:id",protect,adminOnly,deleteproduct)

module.exports = router;
