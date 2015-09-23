//Server Vars
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var index = fs.readFileSync(__dirname + '/../client/client.html');

var app = http.createServer(onRequest).listen(port);

console.log("Listening on 127.0.0.1: " + port);

var user = {};

var io = socketio(app);

//HTTP
function onRequest(request, response)
{
	response.writeHead(200,{"Content-Type":"text"});
	response.write(index);
	response.end();
}

//When a socket connects, assign it's delegate functions
io.sockets.on("connection",function(socket){
	//Call these functions to hook up listener events
	onJoined(socket);
	onDisconnect(socket);
});

//When a new socket joins
var onJoined = function(socket){
	//Setting EventListener for join
	socket.on("join",function(data){
		
	});
};

var onDisconnect = function(socket){
	socket.on('disconnect',function(data){
		
	});
}



