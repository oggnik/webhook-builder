var spawn   = require('child_process').spawn;
var express = require('express');

var app = express();

// For easy editing
var port = 3205;
var script = "sendCommandTMUX"


/*
	Post for submit
	This is used to submit youtube links
*/
app.post('/webhook', function(req, res) {
	console.log("Request received");
	console.log(req.body);
	var command = spawn(__dirname + '/' + script);
	var output = [];
	var errorOut = [];

	command.stdout.on('data', function(chunk) {
		output.push(chunk);	
	});
	command.stderr.on('data', function(chunk) {
		errorOut.push(chunk);	
	});

	command.on('close', function(code) {
		if (code === 0) {
			// We are good
			console.log("Command executed");
		} else {
			// Something went wrong
			console.log("The script did not return with code 0");
			console.log("Output");
			console.log(Buffer.concat(output));
			console.log("Stderr Output");
			console.log(Buffer.concat(errorOut));
		}
	});

	res.end();
});


var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Youtube Jukebox listening at http://%s:%s', host, port);

});