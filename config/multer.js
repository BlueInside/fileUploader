const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, limits: {
        fileSize: 2097152
    }
})

module.exports = { upload }