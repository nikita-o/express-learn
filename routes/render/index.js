const express = require('express');
const router = express.Router();

const { books } = reqapp("store")

router
.get('/', (req, res) => {
  res.render('index', {
    title: 'index',
    books
  });
})
.get('/books/create', (req, res) => {
  res.render('templates/books/create', {
    title: 'create',
    book: {},
  });
})
.post('/books/create', (req, res) => {
  res.redirect('/');
})
.get('/books/update/:id', (req, res) => {
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  res.render('templates/books/create', {
    title: 'update',
    book: books[idx],
  });
})
.post('/books/update/:id', (req, res) => {
  res.redirect('/');
})
.get('/books/:id', (req, res) => {
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);
  res.render('templates/books/view', {
    title: 'view',
    book: books[idx],
  });
});

module.exports = router;