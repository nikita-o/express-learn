const Book = reqapp("entities/book")
const fileMulter = reqapp("middleware/fileMulter")
const { books } = reqapp("store")

const path = require('path')
const { Router } = require("express")
const router = Router()


router
.get('/', (req, res) => {
  res.json(books)
})

.get('/:id', (req, res) => {
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  res.json(books[idx])
})

.post('/', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), function (req, res) {
  const {
    title,
    description,
    authors,
    favorite,
  } = req.body
  const fileCover = req.files.cover ? req.files.cover[0].filename : null
  const fileName = req.files.book ? req.files.book[0].originalname : null
  const fileBook = req.files.book ? req.files.book[0].filename : null

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  )
  books.push(newBook)
  res.json(newBook)
})

.put('/:id', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), (req, res) => {
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  const {
    title,
    description,
    authors,
    favorite,
  } = req.body

  books[idx] = {
    ...books[idx],
    title,
    description,
    authors,
    favorite,
  }

  books[idx].fileCover = req.files.cover ? req.files.cover[0].filename : books[idx].fileCover
  books[idx].fileName = req.files.cover ? req.files.cover[0].originalname : books[idx].fileName
  books[idx].fileBook = req.files.cover ? req.files.cover[0].filename : books[idx].fileBook

  res.json(books[idx])
})

.delete('/:id', function(req, res) {
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  books.splice(idx, 1)
  res.send('ok')
})

.get('/:id/download', (req, res) => {
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  const { fileBook } = books[idx]
  const file = path.join(process.env.APP_ROOT, 'public', 'books', fileBook)
  res.download(file)
})

module.exports = router