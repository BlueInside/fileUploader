

const getFiles = (req, res, next) => {
    res.send('GET ALL FILES')
}

const addFile = (req, res, next) => {
    console.log('File info: ', req.file)
    console.log('BODY INFO: ', req.body)
    res.send('POST FILE')
}

const updateFile = (req, res, next) => {
    res.send(`UPDATE ${req.params.id} FILE`)
}

const removeFile = (req, res, next) => {
    res.send(`REMOVE ${req.params.id} FILE`)
}

module.exports = {
    getFiles,
    addFile,
    updateFile,
    removeFile,
}