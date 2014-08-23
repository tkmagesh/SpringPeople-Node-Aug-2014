var express = require('express');
var router = express.Router();
var repository = require('../repositories/taskRepository');


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('tasks/list', {list : repository.getAll()});
});

router.get('/new', function(req,res){
	res.render('tasks/new');
});

router.post('/new', function(req,res){
	var taskName = req.body.taskName;
	repository.add(taskName);
	res.render('tasks/list', {list : repository.getAll()});
});

router.get('/toggle', function(req,res){
	var id = parseInt(req.query.id,10);
	repository.toggle(id);
	res.render('tasks/list', {list : repository.getAll()});
});

router.get('/save',function(req,res){
	repository.save(function(err){
		if (err) throw err;
		res.render('tasks/list', {list : repository.getAll(), message : "Data saved successfully!"});	
	});

});

router.get('/data',function(req,res){
	res.write(JSON.stringify(repository.getAll()));
	res.end();
});

module.exports = router;
