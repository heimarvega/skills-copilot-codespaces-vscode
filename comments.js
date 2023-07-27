//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var port = 8080;
var commentsFile = path.join(__dirname, 'comments.json');

//use body parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//serve static files
app.use(express.static(__dirname + '/public'));

//routing
app.get('/comments', function(req, res){
	fs.readFile(commentsFile, function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.post('/comments', function(req, res){
	fs.readFile(commentsFile, function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}
		var comments = JSON.parse(data);
		var newComment = {
			id: Date.now(),