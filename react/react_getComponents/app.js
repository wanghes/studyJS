var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');
var methodOverride = require('method-override');
var app = express();

app.use(express.static(__dirname +""));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

global.users = [
    {id:1,value:"北京出版社"},
    {id:2,value:"河北出版社"},
    {id:3,value:"天津出版社"},
    {id:4,value:"上海人民出版社"},
    {id:5,value:"111人民出版社"}
 ];

global.books = [
    {id:1,name:"book1",author:"刘少乾",publish:"北京出版社"},
    {id:2,name:"book2",author:"付明乐",publish:"河北出版社"},
    {id:3,name:"book3",author:"王海松",publish:"天津出版社"},
    {id:4,name:"book4",author:"雷庆",publish:"上海人民出版社"},
    {id:5,name:"book5",author:"雷庆2",publish:"111人民出版社"}
]

app.get('/books',function(req,res){
    res.send(global.books);
});
app.get('/users',function(req,res){

    res.send(global.users);
});
//模糊查询
app.get('/users/query',function(req,res){
    var json = null;
    var tempArr = [];
    if(req.query.term){
        global.users.forEach(function(item){
            if(item.value.indexOf(req.query.term)>=0){
                tempArr.push(item);
            }
        })
    }
    res.send(tempArr);
});
app.get('/book/:id',function(req,res){
    var newBooks = global.books;
    var id = req.params.id;
    var books = newBooks.filter(function(item){
        return (item.id == id);
    })
    res.send(books[0]);
});
app.listen(3001);
