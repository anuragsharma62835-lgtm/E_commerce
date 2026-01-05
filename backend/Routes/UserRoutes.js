const express = require('express')
const router = express.Router();
const {getuser,createuser,loginuser, getProfile} = require('../Controller/UserController');
const {protect} = require('../middleware/authmiddleware')

router.get('/get',protect,getuser)
router.post('/create',createuser)
router.post('/login',loginuser)
router.get('/profile',protect,getProfile)

module.exports = router;