
// List all user files
const getFiles = (req, res, next) => {
    res.send('GET ALL User FILES')
}

// Get information about specific file
const getFileInfo = (req, res, next) => {
    res.send(`GET file ${req.params.id} info`)
}

// Remove file
const removeFile = (req, res, next) => {
    res.send(`REMOVE ${req.params.id} FILE`)
}

module.exports = {
    getFiles,
    removeFile,
}