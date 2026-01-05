const express = require('express')
const router = express.Router();
const {getproduct,createproduct, getProductById} = require('../Controller/ProductController')
const upload = require('../middleware/upload')

router.get('/get',getproduct)
router.post('/create',upload.single('image'),createproduct)
router.get('/getbyid/:id',getProductById)

module.exports = router;
