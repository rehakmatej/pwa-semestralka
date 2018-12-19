'use strict';

var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var path = require('path');

// our localhost port

var app = express();

// our server instance
var server = http.createServer(app);

// This creates our socket using the instance of the server
var io = socketIO(server);
app.set('port', process.env.PORT || 3001);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', function (socket) {
  console.log('New client connected');

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('msgFromClient', function (color) {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

server.listen(app.get('port'), function () {
  return console.log('Listening on port ' + port);
});