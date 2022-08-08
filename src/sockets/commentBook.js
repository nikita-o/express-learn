const { Server } = require('socket.io');
const message = reqapp("models/message")

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
  // options
  });

  io.on('connection', (socket) => {
  const {id} = socket;
  console.log(`Socket connected: ${id}`);

  socket.on('comment', async (msg) => {
    const newMessage = new MessageModel({
      author: msg.username,
      message: msg.text,
      bookId: msg.bookId,
      date: new Date(),
    });

    try {
      await newMessage.save();
    } catch (e) {
      console.error(e);
    }

    socket.to(bookId).emit('comment', msg);
    socket.emit('comment', msg);
  })

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
  })
}