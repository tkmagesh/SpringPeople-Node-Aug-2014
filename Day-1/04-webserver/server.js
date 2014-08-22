var http=require('http');
var path=require('path');

function requestListener(req,res){
	console.log("A new request is received for - ", req.url);
	console.log("physical path = ", path.join(__dirname, req.url));
	res.write("<h1>Welcome to Node</h1>");
	res.end();
}
var server = http.createServer(requestListener);
server.listen(9090);
console.log("Server listening on port 9090");
