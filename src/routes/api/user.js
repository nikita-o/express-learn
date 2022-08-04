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
passport.authenticate('local'),
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

.get('/me', (req, res) => {
  res.send('GET request to the homepage')
})

module.exports = router
