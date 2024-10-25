const express = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');
const upload = multer({ dest: 'uploads/' });
const fileRouter = express.Router();

const { ensureAuthenticated, isFileOwner } = require('../middlewares/authMiddleware');

fileRouter.get('/', ensureAuthenticated, filesController.getFiles)

fileRouter.get('/:id/details', ensureAuthenticated, isFileOwner, filesController.getFileInfo)

fileRouter.delete('/:id', ensureAuthenticated, isFileOwner, filesController.removeFile)

module.exports = fileRouter