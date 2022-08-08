const { Router } = require("express")
const router = Router()
const passport = reqapp('middleware/passport')
const User = reqapp('models/user')

router
.post('/login',
passport.authenticate('local'),
(req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

.post('/signup',
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
    res.json(user)
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

.get('/me', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).send('you is not authenticated')
  }
  next()
},
(req, res) => {
  res.json({ user: req.user })
})

module.exports = router
