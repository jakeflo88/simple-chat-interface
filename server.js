//server functionality
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var redis = require('redis');
//var client = redis.createClient();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//for chat messages
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  //for signins
  socket.on('signin', function(nick){
  	io.emit('signedin', nick);
  });

});

app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
