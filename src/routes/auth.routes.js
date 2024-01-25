const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');
const upload = require('../middlewares/userAvatarLoad');


router.post('/register', upload.single('user_avatar'), userController.register);
// router.get('/profile', userController.getUSer)

module.exports = router;