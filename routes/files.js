const express = require('express');
const multer = require('multer');
const filesController = require('../controllers/filesController');
const upload = multer({ dest: 'uploads/' });
const fileRouter = express.Router();

fileRouter.get('/', filesController.getFiles)

fileRouter.post('/', upload.single('file'), filesController.createFile)

fileRouter.put('/', filesController.updateFile)

fileRouter.delete('/', filesController.removeFile)

module.exports = fileRouter