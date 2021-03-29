#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('proj:server');
var http = require('http');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
let io = require('socket.io')().listen(server);
var allClients = {};
connectCounter=0;
/**
 * Listen on provided port, on all network interfaces.
 */
 io.sockets.on('connection',  (socket) => {
   

    io.sockets.emit("counter",++connectCounter)
    io.sockets.emit('userlist', allClients);
  socket.on('disconnect', function() { 
    
    delete allClients[socket.id]
    connectCounter--;
    io.sockets.emit("counter",connectCounter)
    socket.broadcast.emit('userlist', allClients)
  
  })
  // Set the nickname property for a given client
  socket.on('nick', (nick) => {
      socket.nickname=nick
      allClients[socket.id]=(socket.nickname);
      
      io.sockets.emit('userlist', allClients);
  });

 

  // Relay chat data to all clients
  socket.on('chat', (data) => {
    

          let nickname = !socket.nickname? 'Anonymous' : socket.nickname;

          let payload = {
              message: data.message,
              nick: nickname,
          };

          socket.emit('chat',payload);
          socket.broadcast.emit('chat', payload);
     
  });
});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
