const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = reqapp('models/user')

const verify = async (username, password, done) => {
  try {
    const user = await User.find({
      username,
    })
    if (!user) return done(null, false)

    if (user.password !== password) return done(null, false)

    return done(null, user)
  } catch (error) {
    console.error(error)
    return done(error)
  }
}

const options = {
  usernameField: "username",
  passwordField: "password",
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser( async (id, cb) => {
  try {
    const user = await User.findById(id)
    cb(null, user)
  } catch (error) {
    console.error(error)
    return cb(err)
  }
})

module.exports = passport