const express = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');
const upload = multer({ dest: 'uploads/' });
const fileRouter = express.Router();

const { ensureAuthenticated, isFileOwner, isFolderOwner } = require('../middlewares/authMiddleware');

fileRouter.get('/', ensureAuthenticated, filesController.getFiles)

// Add file to specific folder
fileRouter.post('/', ensureAuthenticated, upload.single('file'), isFolderOwner, filesController.uploadFile)

fileRouter.get('/:id/details', ensureAuthenticated, filesController.getFileInfo)

fileRouter.delete('/:id', ensureAuthenticated, isFileOwner, filesController.removeFile)

module.exports = fileRouter