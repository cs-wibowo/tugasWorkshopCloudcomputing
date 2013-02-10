
/**
 * Module dependencies.
 */

// BLOCK START ---------------- mongo

var port = (process.env.VMC_APP_PORT || 80);
var host = (process.env.VCAP_APP_HOST || 'localhost');
//var http = require('http');

// BLOCK END ---------------- mongo


var express = require('express')
  , app = express()
  , routes = require('./routes')
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80, function(){
  console.log("Express server listening on port " + 80);
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/crud', routes.dbdisplay);

/*app.get('/socket.io/socket.io.js', function(req, res) {
  path.join(require('socket.io-client').dist, 'socket.io.min.js');
  path.join(__dirname, 'node_modules/socket.io-client/dist/socket.io.min.js')
});*/

io.sockets.on('connection', function (socket) {

  socket.on('create', function (data) {
    socket.emit('REScreate', { msg : routes.dbcreate(data) });
  });

  socket.on('update', function (data) {
    socket.emit('RESupdate', { msg : routes.dbupdtae(data) });
  });

  socket.on('remove', function (data) {
    socket.emit('RESremove', { msg : routes.dbremove(data) });
  });

});