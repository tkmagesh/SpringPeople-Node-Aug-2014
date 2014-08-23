var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/*module.exports = function(req,res,next){
	var path = url.parse(req.url).pathname;
	var method =req.method;
	if (method === "GET" && path === "/"){
		
	}
}*/
