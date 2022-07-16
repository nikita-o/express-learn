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

.post('/', fileMulter.single('book'), function (req, res) {
  const {
    title,
    description,
    authors,
    favorite,
  } = req.body
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover = '???',
    fileName = req.file.originalname,
    fileBook = req.file.filename,
  )
  books.push(newBook)
  res.json(newBook)
})

.put('/:id', (req, res) => {
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