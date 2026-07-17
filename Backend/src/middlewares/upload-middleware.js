const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
    storage, fileFilter: (req, file, cb) => {
        if(file.mimetype === "application/pdf") {
            cb(null, true)
        }else{
            cb(new Error("Only PDF allowed"))
        }
    }
});

module.exports = upload;