const prisma = require('../prisma');
const asyncHandler = require('express-async-handler');

// Current user folders list
const getFolders = asyncHandler(async (req, res, next) => {

    const userFolders = await prisma.folder.findMany({
        where: {
            userId: req.user.id
        }
    })

    res.render('folders', { folders: userFolders })
})

// Create new folder
const createFolder = asyncHandler(async (req, res, next) => {
    const newFolder = await prisma.folder.create({
        data: {
            userId: req.user.id,
            name: 'folder',
        }
    })

    res.redirect('/folders')
});

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
    const folderId = req.body.folder_id
    res.send(`REMOVE ${req.body.folder_id} Folder`)
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