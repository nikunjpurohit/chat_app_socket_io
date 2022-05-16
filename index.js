//Node server which will handle socket.io connection



const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users ={};

io.on('connection',socket=>{
  // If any new user joins, let other connected users know about it!!
    socket.on('new-user-joined',name=>{
    
    users[socket.id]=name;
    console.log("New user", users)
    socket.broadcast.emit('user-joined',name)})

    // I fsomone sends a message, broadcast it to other people

    socket.on('send',message=>{
        socket.broadcast.emit(
        'recieve',{message:message,name:users[socket.id]}
    )})
//If someone leaves the chat let other people know
    socket.on('disconnect',message=>{
      socket.broadcast.emit(
      'left',users[socket.id]
  )
  
  delete users[socket.id]
  
})

})
