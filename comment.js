// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up the server
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening at http://%s:%s', host, port);
});

// Set up the route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/comment.html');
});

app.post('/postComment', function(req, res) {
    var comment = req.body.comment;
    fs.appendFile('comment.txt', comment + '\n', function(err) {
        if (err) throw err;
        console.log('Comment is saved!');
    });
    res.sendFile(__dirname + '/comment.html');
});

app.get('/getComment', function(req, res) {
    fs.readFile('comment.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        res.send(data);
    });
}); 