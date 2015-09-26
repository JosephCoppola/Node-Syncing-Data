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
	onAddToCount(socket);
});

//When a new socket joins
var onJoined = function(socket){
	//Setting EventListener for join
	socket.on("join",function(data){
		console.log(data.name + " just joined");
		
		var userName = data.name;
		var key = socket.id;
		socket.username = userName;
		
		users[key] = socket;
		
		socket.join('room1');
		
		var message = "Welcome to Joe's Counter";
		
		socket.emit("notify",{name:data.name,serverNumber:serverCount,msg:message});
	});
};

var onDisconnect = function(socket){
	socket.on('disconnect',function(data){
		serverCount -= 100;
		var message = socket.username + " has left the room -100!";
		io.sockets.in('room1').emit('notify',{name:data.name,serverNumber:serverCount,msg:message});
		var key = users.indexOf(socket.id);
		users.splice(key,1);
	});
}

var onAddToCount = function(socket){
	socket.on('addToCount',function(data){
		console.log(data.name + " added " + data.count);
		
		serverCount += data.count;
		
		var message = data.name + " added " + data.count;
		
		io.sockets.in('room1').emit('notify',{name:data.name,serverNumber:serverCount,msg:message});
	});
}



