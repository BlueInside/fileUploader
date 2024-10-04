const { body, validationResult } = require('express-validator')

const validateLogin = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render('login', { errors: result.array() })
    }
    next();
}

const loginValidations = [
    body('username')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6, max: 50 }).withMessage('Password must be 6-50 characters long'),
]

module.exports = { validateLogin, loginValidations };