var http = require('http');
var fs = require('fs');

var app = http.createServer(function(req, res) {
    fs.readFile('client.html', 'utf-8', function(error, data) {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write(error.toString());
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            console.log(data)
            res.write(data);
        }
        res.end();
    })
}).listen('1234');
