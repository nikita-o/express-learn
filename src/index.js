const path = require('path')

require('dotenv').config()
global.reqapp = (modulePath) =>
  require(path.join(process.env.APP_ROOT, 'src', modulePath))

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const userRouter = reqapp('routes/api/user')
const booksRouter = reqapp('routes/api/books')
const error404 = reqapp('middleware/error404')

const publicPath = path.join(process.env.APP_ROOT, 'public')
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)
app.use(error404)

app.listen(port, () => console.log(`App listening on port ${port}`))
