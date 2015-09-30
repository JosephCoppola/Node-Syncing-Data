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
	console.log("New connection");
	onDraw(socket);
	onDisconnect(socket);
	
	socket.join('room1');
});

var onDraw = function(socket){
	//Setting EventListener for draw
	socket.on("draw",function(data){
		var drawParams = {};
		
		var time = new Date().getTime();
		
		//Construct draw call object
		drawParams.x = data.x;
		drawParams.y = data.y;
		drawParams.id = socket.id;
		drawParams.timeStamp = time;
		
		io.sockets.in('room1').emit('addToDrawStack',drawParams);
	});
};

var onDisconnect = function(socket){
	socket.on('disconnect',function(data){

	});
}
