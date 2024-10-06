const { body, validationResult } = require('express-validator')

const validateRegistration = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render('register', { errors: result.array() })
    }
    next();
}

const registerValidations = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6, max: 50 }).withMessage('Password must be 6-50 characters long'),
    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(`Passwords don't match`);
            }
            return true
        }),
]

module.exports = { registerValidations, validateRegistration }