const prisma = require('../prisma');
const asyncHandler = require('express-async-handler');

// List all user files
const getFiles = asyncHandler(async (req, res, next) => {

    const userFiles = await prisma.file.findMany({
        where: { userId: req.user.id },
        select: {
            id: true,
            fileName: true,
            size: true,
            createdAt: true,
        }
    })

    res.render('listUserFiles', { userFiles })
})

// Get information about specific file
const getFileInfo = asyncHandler(async (req, res, next) => {
    const fileId = parseInt(req.params.id, 10);

    const file = await prisma.file.findUnique({
        where: { id: fileId }
    })

    res.render('fileDetails', { file })
})

// Remove file
const removeFile = asyncHandler(async (req, res, next) => {
    const fileId = parseInt(req.params.id, 10);

    await prisma.file.delete({
        where: { id: fileId }
    })

    res.redirect(`/files`)
})

const uploadFile = asyncHandler(async (req, res, next) => {
    const folderId = req.body.folder_id;

    res.send(`FILE UPLOADED TO FOLDER ${folderId}`)
})
module.exports = {
    getFiles,
    removeFile,
    getFileInfo
}