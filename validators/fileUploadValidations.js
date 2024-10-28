const { body, validationResult } = require('express-validator')

const validateFileUpload = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        req.session.errors = result.array();
        return res.redirect('/')
    }
    next();
}

const fileUploadValidations = [
    body('fileName')
        .trim()
        .notEmpty()
        .withMessage('File name cannot be empty')
        .isLength({ min: 1, max: 30 })
        .withMessage('Filename must be between 1-30 characters long'),

    body('folder_id')
        .trim()
        .notEmpty()
        .withMessage('Folder identifier must be included.')
]

module.exports = { validateFileUpload, fileUploadValidations };