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
    const folderId = parseInt(req.body.folder_id, 10);

    if (!req.file) {
        throw new Error('No files found to be uploaded.');
    }

    const uploadFile = await prisma.file.create({
        data: {
            fileName: req.body.fileName,
            size: req.file.size,
            url: 'some url',
            folderId,
            userId: req.user.id,
        }

    });

    res.redirect(`/files/${uploadFile.id}/details`);
})
module.exports = {
    getFiles,
    removeFile,
    getFileInfo,
    uploadFile,
}