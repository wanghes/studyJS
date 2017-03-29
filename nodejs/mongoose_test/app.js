var express = require('express');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var Kitten;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mege_test', {
    db: {
        safe: true
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var kittySchema = mongoose.Schema({
        name: String
    });
    kittySchema.methods.speak = function() {
        var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
        return greeting;
    }
    Kitten = mongoose.model('Kitten', kittySchema);
    bluebird.promisifyAll(Kitten);
    bluebird.promisifyAll(Kitten.prototype);
});

var app = express();

app.get('/', function(req, res) {
    var silence = new Kitten({ name: 'Silence' });
    silence.save().then(function() {
        res.send(silence.speak());
    }).catch(function(err) {
        console.log(err);
    });
});

app.get('/all', function(req, res) {
    var obj = new Kitten({ name: 'test1111' });
    console.log(Kitten.prototype);
    var results = [
        obj.saveAsync(),
        Kitten.findAsync()
    ]

    bluebird.all(results).then(function(data) {
        res.send(data);
    });

});

app.put('/update/:id', function(req, res, next) {
    var id = req.params.id;

    if (!id) {
        return res.send("不存在ID");
    }
    Kitten.findByIdAndUpdateAsync(id, { name: "wanghaisong" }, { new: true }).then(function(data) {
        res.send(data);
    }).catch(function(err) {
        next(err);
    })
});

app.delete('/delete/:id', function(req, res, next) {
    var id = req.params.id;

    if (!id) {
        return res.send("不存在ID");
    }
    Kitten.findByIdAndRemoveAsync(id).then(function(data) {
        res.send(data);
    }).catch(function(err) {
        next(err);
    })
});

app.delete('/deleteAll', function(req, res, next) {
    var ids = [];
    Kitten.findAsync({}).then(function(data) {
        data.forEach(function(item) {
            ids.push(item._id);
        });
        return ids;
    }).then(function(data) {
        Kitten.remove({ _id: { $in: data } }).then(function(data) {
            res.send(data);
        }).catch(function(err) {
            next(err);
        })
    }).catch(function(err) {
        next(err);
    })
});


app.use(function(err, req, res, next) {
    err.status = err.status || 500;
    return res.send(err);
});


app.listen(3000);
