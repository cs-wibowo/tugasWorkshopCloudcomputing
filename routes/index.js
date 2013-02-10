
/* GET home page. */

exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};



// BLOCK START ---------------- mongo

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
}
else{
  var mongo = {
      "hostname":"localhost",
      "port":27017,
      "username":"",
      "password":"",
      "name":"",
      "db":"company"
  }
}


var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'company');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

var db = require('mongodb');
// BLOCK END ---------------- mongo


/* CRUD : CReate Update Delete */

exports.dbdisplay = function(req, res) {
	db.connect(mongourl, function(err, conn){
		//console.log(mongourl);
	    conn.collection('employees', function(err, coll){
	        coll.find(
	        	{}
	        	, {_id:0}
	        	, function(err, cursor){
	        		cursor.toArray(function(err, emps){
	            		res.render('crud', {employees: emps });
	            	});
	        	}
	        );
	    });
	});
};


exports.dbcreate = function(data) {
	db.connect(mongourl, function(err, conn){
	    conn.collection('employees', function(err, coll){
		    coll.save(
		    	{ id : data.id, name : data.name, department : data.department, salary : data.salary }
		    	, {safe:true}
		    	, function(err){
		        	if(err){ return "failed"; }else{ return "success"; }
	    		}
	    	);
	    });
  	});
};

exports.dbupdtae = function(data) {
	db.connect(mongourl, function(err, conn){
	    conn.collection('employees', function(err, coll){
		    coll.update(
		    	{ id : data.oldid }
		    	, { $set : { id : data.id, name : data.name, department : data.department, salary : data.salary } }
		    	, function(err){
		        	if(err){ return "failed"; }else{ return "success"; }
	    		}
	    	);
	    });
  	});
};

exports.dbremove = function(data) {
	db.connect(mongourl, function(err, conn){
	    conn.collection('employees', function(err, coll){
		    coll.remove(
		    	{ id : data.id }
		    	, function(err){
		        	if(err){ return "failed"; }else{ return "success"; }
	    		}
	    	);
	    });
  	});
};