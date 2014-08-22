var fs = require('fs');
var calculator = require('./calculator.js')
fs.readFile('./calculatorSeed.txt',{encoding : "utf8"}, function(err,data){
	if (err) throw err;
	var lines = data.split('\n');
	var result = 0;
	for(var i=0;i<lines.length;i++){
		var cols=lines[i].split(',');
		var operation = cols[0],
			n1 = parseInt(cols[1],10),
			n2 = parseInt(cols[2],10);
		result += calculator[operation](n1,n2);
	}
	console.log(result);
});