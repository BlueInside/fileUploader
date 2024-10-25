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

    res.send(`REMOVE ${req.params.id} FILE`)

})
module.exports = {
    getFiles,
    removeFile,
    getFileInfo
}