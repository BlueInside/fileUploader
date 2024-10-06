

const getFolders = (req, res, next) => {
    res.send('GET ALL Folders')
}

const createFolder = (req, res, next) => {
    res.send('POST Folder')
}

const updateFolder = (req, res, next) => {
    res.send(`UPDATE ${req.params.id} Folder`)
}

const removeFolder = (req, res, next) => {
    res.send(`REMOVE ${req.params.id} Folder`)
}

module.exports = {
    getFolders,
    createFolder,
    updateFolder,
    removeFolder,
}