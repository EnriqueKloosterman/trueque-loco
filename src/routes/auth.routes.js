const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');



router.get('/profile', userController.getUSer)

module.exports = router;