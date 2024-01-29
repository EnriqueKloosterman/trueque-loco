const { body, validationResult } = require("express-validator");

const validationsResults = {
    registerValidation: [
        body('user_name', 'user name is required, It should have at least 3 characters')
            .notEmpty()
            .isLength({ min: 3 }),
        body('user_email', 'email is required')
            .trim()
            .notEmpty()
            .isEmail()
            .normalizeEmail(),
        body('user_password', 'password is required')
            .trim()
            .notEmpty(),
            // .isLength({ min: 8, max: 20 }),
        body('user_address', 'address is required')
            .notEmpty()
            .isString(),
        body('user_phone', 'phone is required')
            .trim()
            .notEmpty()
            .isLength({ min: 5, max: 20 }),
        (req, res, next) => {
            const errors = validationResult(req);
            console.log('Validation Errors:', errors.array());

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ]
}

module.exports = validationsResults;