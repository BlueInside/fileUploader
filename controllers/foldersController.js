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

// Get edit form

const getEditForm = asyncHandler(async (req, res, next) => {
    const folderId = parseInt(req.params.id, 10);

    if (isNaN(folderId)) {
        const error = new Error('Invalid folder Id')
        error.status = 400;
        return next(error)
    }

    const folderData = await prisma.folder.findUnique({
        where: { id: folderId }
    });

    if (!folderData) {
        const error = new Error('Folder not found')
        error.status = 404;
        return next(error)
    }

    res.render('editFolderForm', { folderData })
})

// View folder content
const getFolderInfo = (req, res, next) => {
    res.send(`GET folder ${req.params.id} info.`)
}

// Rename/update folder
const updateFolder = asyncHandler(
    async (req, res, next) => {
        const folderId = parseInt(req.body.folder_id)

        if (isNaN(folderId)) {
            const error = new Error('Invalid folder Id');
            error.status = 400;
            next(error);
        }

        await prisma.folder.update({
            where: { id: folderId },
            data: {
                name: req.body.name
            }
        }
        )
        // ADD VALIDATORS TO UPDATE FORM NAME!!!
        res.redirect('/folders')
    }
)

// Delete folder
const removeFolder = asyncHandler(async (req, res, next) => {
    const folderId = parseInt(req.body.folder_id, 10);

    if (isNaN(folderId)) {
        const err = new Error('Invalid folder Id')
        err.status = 400;
        return next(err);
    }

    const deletedFolder = await prisma.folder.delete({
        where: { id: folderId },
    });

    res.redirect('/folders');
})

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
    getEditForm,
}