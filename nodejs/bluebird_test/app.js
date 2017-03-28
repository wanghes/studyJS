var express = require('express');
var Promise = require('bluebird');
var fs = require('fs');
var compression = require('compression'); //启用gzip压缩
var readFileAsync = Promise.promisify(fs.readFile);


var app = express();
app.use(compression());
app.use(express.static(__dirname));
//传统的回调嵌套方式获取数据
app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/init',function(req,res){
    fs.readFile('./city.json', 'utf-8', function(err,data){
        if(err) console.log(err);
        if(data){
            console.log(typeof data);
            let citys = {city:data};
            fs.readFile('./user.json', 'utf-8', function(err,data){
                res.send([{user:data}].concat(citys));
            })

        }
    });
})

app.get('/fetch/city',function(req,res){
    readFileAsync('./city.json', 'utf-8').then(function(data){
        return data;
    }).then(function(data){
        console.log(data);
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    });
});

app.get('/fetch/cityUsers',function(req,res,next){
    let files = [
        readFileAsync('./city.json', 'utf-8'),
        readFileAsync('./user.json', 'utf-8'),
        //readFileAsync('./uer.json', 'utf-8') 查看错去走中间件
    ];
    Promise.all(files).then(function(data) {
        return data;
    }).then(function(data){
        res.send(data);
    }).catch(function(err){
        next(err)
    });
});

app.use(function(req, res, next) {
  console.log(404);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res,next) {
  err.status =  err.status || 500;
  return res.send(err);
});

app.listen(4500);