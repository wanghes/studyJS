let express = require('express');
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let errorhandler = require('errorhandler')
let notifier = require('node-notifier');
let app = express();
var user,books;
app.use(express.static(__dirname));
app.use(bodyParser.json());

let modelsPath = path.join(__dirname,'model');
fs.readdirSync(modelsPath).forEach(function(file){
    if(/user/.test(file)){
        user = require(modelsPath+'/'+file)
    }
     if(/books/.test(file)){
         books = require(modelsPath+'/'+file)
    }
    /*if(/(.*)\.(js|coffee)$/.test(file)){
        console.log(modelsPath+'/'+file);
        console.log(require(modelsPath+'/'+file));
    }*/
});


app.get('/getData',function(req,res){
    res.status(200).json(user.concat(books));
});
app.post('/postData',function(req,res){
    if(req.body.name){
        var name = req.body.name
    }

    let info = user.filter(function(item){
        return item.name == name;
    })
    res.status(200).json(info[0]);
})
app.delete('/delete/:name',function(req,res){
    console.log(req.params.name)
    if(req.params.name){
        var name = req.params.name;
    }
    var del = false;

    user.forEach(function(item,index){
        if(item.name==name){
            user.splice(index,1);
            del = true;
        }
    });
    if(del){
         res.status(200).json(user);
    }else{
        res.status(422).json({message:"不存在这个数据了，估计已经被删除了"});
    }
});

app.put('/update/:id',function(req,res){
    let id = req.params.id;
    let title = req.body.title;
    let updateInfo = false;
    let upsert = books.forEach(function(item,index){
        if(item.id==id){
            item.title = title;
            updateInfo = item;
        }
    });

    if(updateInfo){
        res.status(200).json({data:updateInfo});
    }else{
        res.status(422).json({message:"更新有问题"});
    }
})


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(process.env.NODE_ENV=="production"){
    console.log('我操 还真是production');
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          error: err
        });
    });
}else if(process.env.NODE_ENV=="development"){
    console.log('我操 还真是development');
    app.use(errorhandler({log: errorNotification}))
}

function errorNotification (err, str, req) {
  var title = 'Error in ' + req.method + ' ' + req.url
  notifier.notify({
    title: title,
    message: str
  })
}

app.listen(3450,function(){
    console.log("启动成功");

});

