
/* GET home page. */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};



/* CRUD : CReate Update Delete */

var db = require("mongojs").connect("localhost/company", ["employees"]);
//var db = require("mongojs").connect("/company", ["employees"]);

exports.dbdisplay = function(req, res) {
	db.employees.find(
		{ }
		, { _id: 0 }
		, function(err, emps) {
			res.render('crud', {employees: emps });
	});
};

exports.dbcreate = function(data) {
	db.employees.save( 
		{ id : data.id, name : data.name, department : data.department, salary : data.salary }
		, function (err, saved) {
			if(err) console.log("success");
  			else console.log("failed");
		}
	);
};

exports.dbupdtae = function(data) {
	db.employees.update(
		{ id : data.oldid }
		, { $set : { id : data.id, name : data.name, department : data.department, salary : data.salary } }
		, function(err) {
			if (err) return ("success");
			else return ("failed");
		}
	);
};

exports.dbremove = function(data) {
	db.employees.remove({ id : data.id }
		, function(err , removed) {
			if (err) return ("success");
			else return ("failed");
		}
	);
};