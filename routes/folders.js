const express = require('express');
const foldersController = require('../controllers/foldersController');
const { ensureAuthenticated, isFolderOwner } = require('../middlewares/authMiddleware')
const folderRouter = express.Router();
const { validateUpdateForm, updateFolderValidations } = require('../validators/updateFormValidations')
// List all users folders
folderRouter.get('/', ensureAuthenticated, foldersController.getFolders)

// Create folder
folderRouter.post('/', ensureAuthenticated, foldersController.createFolder)

// Get all files inside folder
folderRouter.get('/:id', ensureAuthenticated, foldersController.getFolderInfo)

// Get edit folder form
folderRouter.get('/:id/edit', ensureAuthenticated, foldersController.getEditForm)

// Rename folder
folderRouter.put('/', ensureAuthenticated, isFolderOwner, updateFolderValidations, validateUpdateForm, foldersController.updateFolder)

// Delete folder
folderRouter.delete('/', ensureAuthenticated, isFolderOwner, foldersController.removeFolder)

module.exports = folderRouter;