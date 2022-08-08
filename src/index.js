const express = require('express')
const session = require('express-session')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose');
const { createServer } = require('http');

require('dotenv').config()
// Кринжовый (а может нет) require где указывается путь относительно корня проекта
global.reqapp = (modulePath) => require(path.join(process.env.APP_ROOT, 'src', modulePath))

const { PORT, URL_MONGO } = reqapp('config')
const userRouter = reqapp('routes/api/user')
const booksRouter = reqapp('routes/api/books')
const indexRouter = require('./routes/render/index')
const error404 = reqapp('middleware/error404')
const passport = reqapp('middleware/passport')
const commentBook = reqapp('sockets/commentBook')

const publicPath = path.join(process.env.APP_ROOT, 'storage')
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath)
}

const app = express()

app.use(express.urlencoded())
app.use(session({ secret: 'SECRET'}));

app.set("view engine", "ejs")
app.set('views', path.join(process.env.APP_ROOT, 'src', 'views'))

app.use(passport.initialize())
app.use(passport.session())

app.use('/storage', express.static('storage'))
app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)
app.use(error404)

async function start() {
  try {
    await mongoose.connect(URL_MONGO)
    const httpServer = createServer(app)
    commentBook(httpServer);
    httpServer.listen(PORT, () => console.log(`Im a live! \n(PORT: ${PORT})`))
  } catch (e) {
    console.error(e)
  }
}

start()