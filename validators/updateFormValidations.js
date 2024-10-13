const { body, validationResult } = require('express-validator')

const validateUpdateForm = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render('login', { errors: result.array() })
    }
    next();
}

const updateFolderValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Folder name cannot be empty')
        .isLength({ min: 1, max: 15 })
        .escape(),
]

module.exports = { validateUpdateForm, updateFolderValidations };