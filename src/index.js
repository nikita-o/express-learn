const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/api/user')
const booksRouter = require('./routes/api/books')
const error404 = require('./middleware/error404')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)

app.use(error404)

app.listen(port, () => console.log(`App listening on port ${port}`))
