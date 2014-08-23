var webSocket = require('nodejs-websocket');
var server = webSocket.createServer(function(connection){
	console.log("a new connection is established...");
	connection.on("text",function(msg){
		server.connections.forEach(function(con){
			con.sendText(msg);
		})
	});
});
server.listen(9090);
console.log("Chat server is listening on port 9090..!!"); 