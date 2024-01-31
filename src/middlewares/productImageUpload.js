const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/products'));
    },
    filename: (req, file, cb) => {
        let newName = uuidv4();
        let filename = `${newName}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;