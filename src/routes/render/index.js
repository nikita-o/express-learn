const axios = require('axios').default;
const express = require('express')
const router = express.Router()

const message = reqapp("models/message")
const Book = reqapp("models/book")
const fileMulter = reqapp("middleware/fileMulter")
const passport = reqapp('middleware/passport')
const User = reqapp('models/user')

router
.get('/', (req, res) => {
  // Пока что redirect, вдруг на главном роуте что то сделаю
  res.redirect('/books')
})

.get('/books', async (req, res) => {
  try {
    const books = await Book.find().select('-__v')
    res.render('templates/books/index', {
      title: 'index',
      books
    })
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/books/create', (req, res) => {
  res.render('templates/books/create', {
    title: 'create',
    book: {},
  })
})

.post('/books/create', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async (req, res) => {
  const {
    title,
    description,
    authors,
  } = req.body
  const fileCover = req.files.cover ? req.files.cover[0].filename : null
  const fileName = req.files.book ? req.files.book[0].originalname : null
  const fileBook = req.files.book ? req.files.book[0].filename : null

  const newBook = new Book({
    title,
    description,
    authors,
    fileCover,
    fileName,
    fileBook,
  })

  try {
    await newBook.save()
    res.redirect('/')
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/books/update/:id', (req, res) => {
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  res.render('templates/books/create', {
    title: 'update',
    book: books[idx],
  })
})

.post('/books/update/:id', fileMulter.fields([{name: 'book'}, {name: 'cover'}]), async (req, res) => {
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

  data = {
    title,
    description,
    authors,
    favorite,
  }
  if (req.files.cover) {
    data.fileCover = req.files.cover[0].filename
  }
  if (req.files.book) {
    data.fileName = req.files.book[0].originalname
    data.fileBook = req.files.book[0].filename
  }

  try {
    await Book.findByIdAndUpdate(id, data)
    res.redirect('/')
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/books/:id', async (req, res) => {
  const {id} = req.params
  
  try {
    const book = await Book.findById(id).select('-__v')
    const messages = await message.find({bookId: id}).select('-__v');
    res.render('templates/books/view', {
      title: 'view',
      book,
      messages,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/user/login', (req, res) => {
  res.render('templates/user/login', {
    title: 'login',
  })
})
.post('/user/login',
passport.authenticate('local', { failureRedirect: '/user/login' }),
(req, res) => {
  res.redirect('/')
})
.get('/user/profile',
(req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).send('you is not authenticated')
  }
  next()
},
(req, res) => {
  res.render('templates/user/profile', {
    title: 'profile',
    user: req.user
  })
})
.get('/user/signup', (req, res) => {
  res.render('templates/user/signup', {
    title: 'signup',
  })
})
.post('/user/signup',
async (req, res) => {
  const {
    username,
    password,
    email,
  } = req.body

  const user = new User({
    username,
    password,
    email,
  })

  try {
    await user.save()
    res.redirect('/')
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})


module.exports = router