const multer = require('multer')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/books')
    },
    filename(req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`)
    }
})

module.exports = multer({storage})