const multer = require('multer')
const { v4: uuid } = require('uuid')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination(req, file, cb){
    const booksPath = path.join(process.env.APP_ROOT, 'storage')
    if (!fs.existsSync(booksPath)) {
      fs.mkdirSync(booksPath)
    }
    cb(null, booksPath)
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}-${file.originalname}`)
  }
})

module.exports = multer({storage})