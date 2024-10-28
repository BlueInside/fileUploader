const prisma = require('../prisma');
const asyncHandler = require('express-async-handler');
const path = require('path');
const { hostFile, hostUrl, removeFileFromHost } = require('../supabaseClient');

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

    const fileToDelete = await prisma.file.findUnique({
        where: { id: fileId }
    });

    if (!fileToDelete) {
        const error = new Error('File not found');
        error.status = 404;
        return next(error);
    }

    const { data, error: removeError } = await removeFileFromHost(fileToDelete.path);

    if (removeError) {
        console.error("Error removing file from storage:", removeError.message);
        return next(removeError);
    }

    await prisma.file.delete({
        where: { id: fileId }
    })

    res.redirect(`/files`)
})

const uploadFile = asyncHandler(async (req, res, next) => {
    const folderId = parseInt(req.body.folder_id, 10);
    const file = req.file

    if (!file) {
        const error = new Error("No file uploaded");
        error.status = 400;
        return next(error);
    }

    const filePath = `${folderId}/${req.body.fileName}`
    const fileExtension = path.extname(file.originalname);
    const finalFileName = `${req.body.fileName}${fileExtension}`;

    const uploadedFile = await hostFile(file, filePath)
    const url = await hostUrl(uploadedFile.path)

    const publicUrl = `${url}?download`
    const uploadFile = await prisma.file.create({
        data: {
            fileName: finalFileName,
            size: file.size,
            url: publicUrl,
            folderId,
            path: uploadedFile.path,
            userId: req.user.id,
        }
    });

    return res.redirect(`/files/${uploadFile.id}/details`);
})

module.exports = {
    getFiles,
    removeFile,
    getFileInfo,
    uploadFile,
}