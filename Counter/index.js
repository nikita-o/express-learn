const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

const books = fs.existsSync('books.json') ? JSON.parse(fs.readFileSync('books.json')) : []

app.post('/counter/:bookId/incr', (req, res) => {
  const { bookId } = req.params
  const idx = books.findIndex(el => el.id === bookId)
  if (idx === -1) {
    idx = books.push({id: bookId, count: 1})
  } else {
    books[idx].count += 1
  }
  fs.writeFileSync('books.json', JSON.stringify(books))
  res.json(books[idx])
})

app.get('/counter/:bookId', function (req, res) {
  const { bookId } = req.params
  const idx = books.findIndex(el => el.id === bookId)
  if (idx === -1) {
    res.status(404)
    res.send('книга не найдена')
    return
  }
  const count = books[idx].count
  res.json(count)
})

app.listen(port, () => console.log(`app listen port: ${port}`));
