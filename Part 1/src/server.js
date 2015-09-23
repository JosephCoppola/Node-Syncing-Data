//Server Vars
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var index = fs.readFileSync(__dirname + '/../client/client.html');

var app = http.createServer(onRequest).listen(port);

console.log("Listening on 127.0.0.1: " + port);

var users = {};

var io = socketio(app);

var serverCount = 0;

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
		
		var userName = data.name;
		var key = socket.id;
		socket.username = userName;
		
		users[key] = socket;
		
		socket.join('room1');
		
		socket.emit("countUpdate",{count:serverCount});
	});
};

var onDisconnect = function(socket){
	socket.on('disconnect',function(data){
		
	});
}

var onAddToCount = function(socket){
	socket.on('addToCount',function(data){
		serverCount += data.count;
		
		socket.broadcast.to('room1').emit('countUpdate',{name:data.name,count:serverCount});
	});
}



