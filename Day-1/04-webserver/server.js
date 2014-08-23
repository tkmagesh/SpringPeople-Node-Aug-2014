var http=require('http'),
	path=require('path'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator'),
	extensions = ['.html','.css','.js','.ico'];

String.prototype.endsWith = function(extn){
	return this.substr(this.length - extn.length) === extn;
};

function requestListener(req,res){
	var urlObject = url.parse(req.url,true);
	var fileName = path.join(__dirname, urlObject.pathname);
	req.fileName = fileName;
	req.urlObject = urlObject;

	var isStaticResource = extensions.some(function(extn){
		return fileName.endsWith(extn);
	});
	if (isStaticResource) {
		processStaticResource(req,res);
		return;
	}
	if (urlObject.pathname === '/calculator'){
		var reqBody = '';
		req.on('data', function(data){
			reqBody += data;
		});
		req.on('end', function(){
			var reqObj = querystring.parse(reqBody);
			var operation = reqObj.operation,
			number1 = parseInt(reqObj.n1,10),
			number2 = parseInt(reqObj.n2,10);

			res.write(calculator[reqObj.operation](number1,number2).toString());
			res.end();	
		});
		
	}
}

function processStaticResource(req,res){
	if (fs.existsSync(req.fileName)){
		var readStream = fs.createReadStream(req.fileName,{encoding : "utf8"});
		/*var readCount = 0;
		readStream.on('data', function(data){
			++readCount;
			res.write(data);
		});
		readStream.on('end',function(){
			console.log(readCount);
			res.end();		
		});*/
		readStream.pipe(res);
	} else {
		res.statusCode = 404;
		res.end();	
	}
}
var server = http.createServer(requestListener);
server.listen(9090);
console.log("Server listening on port 9090");
