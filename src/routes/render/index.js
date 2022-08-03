const axios = require('axios').default;
const express = require('express')
const router = express.Router()

const { books } = reqapp("store")
const Book = reqapp("entities/book")
const fileMulter = reqapp("middleware/fileMulter")

router
.get('/', (req, res) => {
  // Пока что redirect, вдруг на главном роуте что то сделаю
  res.redirect('/books')
})

.get('/books', (req, res) => {
  res.render('templates/books/index', {
    title: 'index',
    books
  })
})

.get('/books/create', (req, res) => {
  res.render('templates/books/create', {
    title: 'create',
    book: {},
  })
})

.post('/books/create', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), (req, res) => {
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
  res.redirect('/')
})

.get('/books/update/:id', (req, res) => {
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  res.render('templates/books/create', {
    title: 'update',
    book: books[idx],
  })
})

.post('/books/update/:id', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), (req, res) => {
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

  res.redirect('/')
})

.get('/books/:id', (req, res) => {
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  res.render('templates/books/view', {
    title: 'view',
    book: books[idx],
  })
})

module.exports = router