const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');
const upload = require('../middlewares/userAvatarLoad');
// const validationResults = require('../middlewares/validationsResults');
const { registerValidation } = require('../middlewares/validationsResults');
const { validationResult } = require('express-validator');
 

router.post('/register', upload.single('user_avatar'), registerValidation, userController.register);
router.get('/profile/:id', userController.getUser)
router.put('update/:id', userController.updateUser)

module.exports = router;