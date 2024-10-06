const express = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');
const upload = multer({ dest: 'uploads/' });
const fileRouter = express.Router();

fileRouter.get('/', filesController.getFiles)

fileRouter.delete('/', filesController.removeFile)

module.exports = fileRouter