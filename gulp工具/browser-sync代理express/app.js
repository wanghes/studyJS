var express = require('express');

var app = express();
app.use(express.static(__dirname));
app.use(function(req, res, next) {
    //路由，类似于java中的拦截器功能，在请求到达后台之前，先在这里处理。
    //  some logic here ..
    req.query["age"] = "28";
    console.info('进入路由，添加一个参数name=tom');
    //next的作用是将请求转发，这个必须有，如果没有，请求到这就挂起了。
    next();
});
app.get('/', function(req, res) {
    res.send('./index.html')
});

app.get('/test', function(req, res) {
    console.log(req.query.age)
    res.send({ a: 1 })
});

// path: /test/1?age=34 中间件中age是最后设置的的
app.get('/test/:id', function(req, res) {
    console.log(req.params.id)
    console.log(req.query.age)
    res.send({ a: 1 })
});

app.use(function(req, res, next) {
    console.log(404);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    err.status = err.status || 500;
    return res.send(err);
});

app.listen(4600);
