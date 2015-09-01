var config = require ('./config')();
var http = require ('http');
var expressServer = require ('./app/expressServer');

var app = new expressServer();

var server = http.createServer(app.expressServer);
server.listen(config.port, function(){
	console.log('Express server running on port ' + config.port);
});