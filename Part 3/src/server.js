//Server Vars
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var port = process.env.PORT || process.env.NODE_PORT || 3000;
var index = fs.readFileSync(__dirname + '/../client/client.html');

var app = http.createServer(onRequest).listen(port);

console.log("Listening on 127.0.0.1: " + port);

//Users and their most recent positions
var users = {};

var io = socketio(app);

//HTTP Request return client index
function onRequest(request, response)
{
	response.writeHead(200,{"Content-Type":"text"});
	response.write(index);
	response.end();
}

//When a socket connects, assign it's delegate functions
io.sockets.on("connection",function(socket){
	//Call these functions to hook up listener events
	console.log("New connection");
	onDraw(socket);
	onJoin(socket);
	onDisconnect(socket);
	
	//Place it in a socket io room for broadcasting
	socket.join('room1');
});

//On joined event listener
var onJoin = function(socket){
	//Setting EventListener for joined
	socket.on("joined",function(data){
		//Get time
		var time = new Date().getTime();
		//Sync the clients stack with the current server user stack
		socket.emit('syncStack',users);
		//Add new user to the stack
		users[data.id] = data;
		//Tell all other clients to add new user to thier stack
		socket.broadcast.to('room1').emit('addToStack',{id:data.id,x:data.x,y:data.y,timeStamp:time});
	});
}

//On draw event listener
var onDraw = function(socket){
	//Setting EventListener for draw
	socket.on("draw",function(data){
		
		var drawParams = {};
		//Get the time
		var time = new Date().getTime();
		
		//Construct the JSON to broadcast 
		drawParams.x = data.x;
		drawParams.y = data.y;
		drawParams.id = socket.id;
		drawParams.timeStamp = time;
		
		//Update the server stack
		users[drawParams.id] = drawParams;
		
		//Tell all clients to update thier screens
		socket.broadcast.to('room1').emit('updateDraw',drawParams);
	});
};

//On disconnect event listener
var onDisconnect = function(socket){
	//Setting disconnect for draw
	socket.on('disconnect',function(data){
		//Remove the client that just disconnected from server and sync other clients
		delete users[socket.id];
		socket.broadcast.to('room1').emit('syncStack',users);
	});
}
