const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  id: String,
  authorId: String,
  bookId: String,
  text: String,
  date: Date,
})

module.exports = model('Message', messageSchema)