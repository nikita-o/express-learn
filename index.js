const express = require('express')
const fs = require('fs')
const path = require('path')

require('dotenv').config()
global.reqapp = (modulePath) =>
  require(path.join(process.env.APP_ROOT, modulePath))

const userRouter = reqapp('routes/api/user')
const booksRouter = reqapp('routes/api/books')
const indexRouter = require('./routes/render/index')
const error404 = reqapp('middleware/error404')

const publicPath = path.join(process.env.APP_ROOT, 'storage')
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

const app = express()

app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.use('/', indexRouter)

app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)
app.use(error404)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app listen port: ${port}`))
