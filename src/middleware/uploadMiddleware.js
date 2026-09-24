const multer = require("multer")

storage = multer.memoryStorage()

const Upload = multer({
    storage:storage
})

module.exports = Upload;