const express = require('express');
const filesController = require('../controllers/filesController');
const { upload } = require('../config/multer')
const fileRouter = express.Router();
const { ensureAuthenticated, isFileOwner, isFolderOwner } = require('../middlewares/authMiddleware');
const { fileUploadValidations, validateFileUpload } = require('../validators/fileUploadValidations')
fileRouter.get('/', ensureAuthenticated, filesController.getFiles)

// Add file to specific folder
fileRouter.post('/', ensureAuthenticated, upload.single('file'), fileUploadValidations, validateFileUpload, isFolderOwner, filesController.uploadFile)

fileRouter.get('/:id/details', ensureAuthenticated, filesController.getFileInfo)

fileRouter.delete('/:id', ensureAuthenticated, isFileOwner, filesController.removeFile)

module.exports = fileRouter