/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var watson = require('watson-developer-cloud');
var fs = require('fs');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/cadastrar", function(req, res) {

	res.sendFile(path.join(__dirname + '/views/cadastrar.html'));
});

app.get("/add", function(req, res) {
	var name = req.body.name;
	res.send(name);
	if (false) {
		var visual_recognition = watson.visual_recognition({
			api_key: '{api_key}',
			version: 'v3',
			version_date: '2016-05-19'
		});


		var params = {
			name: 'fruit',
			apple_positive_examples: fs.createReadStream('./apples.zip'),
			negative_examples: fs.createReadStream('./vegetables.zip')
		};

		visual_recognition.createClassifier(params,
			function(err, response) {
				if (err)
				console.log(err);
				else
				console.log(JSON.stringify(response, null, 2));
			});
	}

	});

	// serve the files out of ./public as our main files
	app.use(express.static(__dirname + '/public'));





	// get the app environment from Cloud Foundry
	var appEnv = cfenv.getAppEnv();

	// start server on the specified port and binding host
	app.listen(appEnv.port, '0.0.0.0', function() {

		// print a message when the server starts listening
		console.log("server starting on " + appEnv.url);
	});
