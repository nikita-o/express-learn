const express = require('express')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose');

require('dotenv').config()
// Кринжовый (а может нет) require где указывается путь относительно корня проекта
global.reqapp = (modulePath) => require(path.join(process.env.APP_ROOT, 'src', modulePath))

const { PORT, URL_MONGO } = reqapp('config')
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
app.set('views', path.join(process.env.APP_ROOT, 'src', 'views'))

app.use('/storage', express.static('storage'))

app.use('/', indexRouter)

app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)
app.use(error404)

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    app.listen(PORT)
  } catch (e) {
    console.error(e)
  }
}

start()