const prisma = require('../prisma');
const asyncHandler = require('express-async-handler');

// Current user folders list
const getFolders = asyncHandler(async (req, res, next) => {

    if (!req.user || !req.user.id) {
        return next(new Error('No user currently logged in!'));
    }

    const userFolders = await prisma.folder.findMany({
        where: {
            userId: req.user.id
        }
    })

    res.render('folders', { folders: userFolders })
})

// Create new folder
const createFolder = (req, res, next) => {
    res.send('POST Folder')
}

// View folder content
const getFolderInfo = (req, res, next) => {
    res.send(`GET folder ${req.params.id} info.`)
}

// Rename/update folder
const updateFolder = (req, res, next) => {
    res.send(`UPDATE ${req.params.id} Folder`)
}

// Delete folder
const removeFolder = (req, res, next) => {
    res.send(`REMOVE ${req.params.id} Folder`)
}

// Upload file to specific folder
const uploadFile = (req, res, next) => {
    res.send(`Upload file to folder ${req.params.folderId}`)
}

module.exports = {
    getFolders,
    getFolderInfo,
    createFolder,
    updateFolder,
    removeFolder,
    uploadFile,
}