const  multer = require('multer');
const path = require('path');
const  {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/user'))
    },
    filename: function(req, file, cb){
        let newName = uuidv4();
        let fileName = `${newName}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const upload = multer({storage: storage});
module.exports = upload;