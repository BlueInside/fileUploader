const { body, validationResult } = require('express-validator')
const prisma = require('../prisma');

const validateUpdateForm = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {

        const folderId = parseInt(req.body.folder_id, 10);  // Convert folder_id to a number

        if (isNaN(folderId)) {
            return next(new Error('Invalid folder ID'));
        }

        let folderData;

        try {
            folderData = await prisma.folder.findUnique({
                where: { id: folderId }
            });


            if (!folderData) {
                throw new Error('Failed to fetch folder information')
            }

        } catch (error) {
            next(error)
        }

        return res.render('editFolderForm', { folderData, errors: result.array() })
    }
    next();
}

const updateFolderValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Folder name cannot be empty')
        .isLength({ min: 1, max: 15 })
        .withMessage('Folder must be between 1-15 characters long')
        .escape(),
    body('folder_id')
        .notEmpty()
        .withMessage('Invalid folder identifier')
]

module.exports = { validateUpdateForm, updateFolderValidations };