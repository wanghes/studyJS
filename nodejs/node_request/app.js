var express = require('express');
var request = require('request');

//请求的文件夹在mongoose_test目录下产生的服务器

var app = express();
app.use(express.static('./public'));
app.use('/bootstrap', express.static( './node_modules/bootstrap/dist'));
app.use('/jquery', express.static( './node_modules/jquery/dist'));
app.get('/allUsers',function(req,res){
  request.get('http://localhost:3000/all', function (error, response, body) {
    res.send(body); // Print the HTML for the Google homepage.
  });
});
app.get('/delete/:id',function(req,res){
  var id = req.params.id;
  request.delete('http://localhost:3000/delete/'+id, function (error, response, body) {
    res.send(body); // Print the HTML for the Google homepage.
  });
});

app.get('/update/:id',function(req,res){
  var id = req.params.id;
  request.put('http://localhost:3000/update/'+id, function (error, response, body) {
    res.send(body); // Print the HTML for the Google homepage.
  });
});

app.listen(3001);
