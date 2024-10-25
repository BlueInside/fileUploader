const express = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');
const upload = multer({ dest: 'uploads/' });
const fileRouter = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

fileRouter.get('/', ensureAuthenticated, filesController.getFiles)

fileRouter.delete('/', filesController.removeFile)

module.exports = fileRouter