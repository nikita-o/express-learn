const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid')

const app = express()
const port = 3000

app.use(bodyParser.json());

class Book {
  constructor(
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    ) {
    this.id = uuid()
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

const store = {
  books: [],
};

app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {
  const {books} = store
  res.json(books)
})

app.get('/api/books/:id', (req, res) => {
  const { books } = store
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  res.json(books[idx])
})

app.post('/api/books', function (req, res) {
  const { books } = store
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

app.put('/api/books/:id', (req, res) => {
  const { books } = store
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

app.delete('/api/books/:id', function(req, res) {
  const { books } = store
  const { id } = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }

  books.splice(idx, 1)
  res.send('ok')
});

app.listen(port, () => console.log(`App listening on port ${port}`))