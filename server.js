var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var UUID = require('node-uuid');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.serverid = UUID().slice(0, 5);

    //io.emit('connection', socket.serverid + " has connected");

    socket.on('disconnect', function(){
        io.emit('disconnect', socket.serverid + " has disconnected");
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', socket.serverid + ": " + msg);
    });
});

http.listen(8080, function() {
    console.log('listening on  *:8080');
});
