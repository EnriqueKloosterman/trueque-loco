const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');
const upload = require('../middlewares/userAvatarLoad');
const { registerValidation } = require('../middlewares/validationsResults');
const requireToken = require('../middlewares/authRequired');

 

router.post('/register', upload.single('user_avatar'), registerValidation, userController.register);
router.get('/profile/:id', requireToken, userController.getUser)
router.put('update/:id', userController.updateUser)
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;