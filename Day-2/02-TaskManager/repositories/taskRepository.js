var fs = require('fs');
var fileName = require('path').join(__dirname , '../data/tasks.json');
var taskList;

fs.readFile(fileName, function(err,data){
	if (err) throw err;
	taskList = JSON.parse(data);
});

var repo = {
	getAll : function(){
		return taskList;
	},
	add : function(taskName){
		var newId = taskList[taskList.length-1].id + 1;
		taskList.push({id : newId, name : taskName, isCompleted : false});
	},
	toggle : function(taskId){
		var task = taskList.filter(function(t){
			return t.id === taskId;
		})[0];
		task.isCompleted = !task.isCompleted;
	},
	save : function(callback){
		
		fs.writeFile(fileName, JSON.stringify(taskList),function(err){
			if (err) callback(err);
			callback();
		});
	}
};

module.exports = repo;