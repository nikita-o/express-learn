const Book = require("../../entities/book")
const { books } = require("../../store")
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
.post('/', function (req, res) {
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  } = req.body
  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
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
    fileCover,
    fileName,
  } = req.body
  books[idx] = {
    ...books[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
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

module.exports = router