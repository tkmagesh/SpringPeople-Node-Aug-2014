var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : "Task - 1", isCompleted : false},
	{id : 2, name : "Task - 2", isCompleted : false},
	{id : 3, name : "Task - 3", isCompleted : false}
];

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('tasks/list', {list : taskList});
});

router.get('/new', function(req,res){
	res.render('tasks/new');
});

router.post('/new', function(req,res){
	var taskName = req.body.taskName;
	var newId = taskList[taskList.length-1].id + 1;
	taskList.push({id : newId, name : taskName, isCompleted : false});
	res.render('tasks/list', {list : taskList});
});

router.get('/toggle', function(req,res){
	console.log(req.query.id);
	var id = parseInt(req.query.id,10);
	var task = taskList.filter(function(t){
		return t.id === id;
	})[0];
	task.isCompleted = !task.isCompleted;
	res.render('tasks/list', {list : taskList});
});

module.exports = router;
