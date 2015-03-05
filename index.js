var express = require('express');

var app = express();


/*
	Post for submit
	This is used to submit youtube links
*/
app.post('/webhook', function(req, res) {
	console.log(req.body);
});


var server = app.listen(3205, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Youtube Jukebox listening at http://%s:%s', host, port);

});