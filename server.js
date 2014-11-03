//server functionality
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var redis = require('redis');
client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 
//for chat history
  //chat content
  client.hgetall('chatHistory', function(err, words){
    console.log(words);
  });
  
  //who said it
  client.hgetall('pplHistory', function(err, people){
    console.log(people);

  //what their strength was
  client.hgetall('strengthHistory', function(err, color) {
    console.log(color);
   });
}); 



	//for chat messages
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    client.incr('msg_id', function(err, msg_id) {
      console.log('msg_id', msg_id);
      client.hset('pplHistory', msg_id, msg[0]);
      client.hset('pplHistory', msg_id, msg[1]);
      client.hset('chatHistory', msg_id, msg[2]);
      client.hset('strengthHistory', msg_id, msg[3]);
    });
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
