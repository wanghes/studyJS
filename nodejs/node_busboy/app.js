var express = require('express');
var busboy = require('connect-busboy');
var path = require('path'),
    fs = require('fs');

var app = express();
app.use(express.static(__dirname));
app.use(busboy({

    limit: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

app.post('/info', function(req, res) {
    if (req.busboy) {
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log(filename)
            var saveTo = path.join(__dirname, 'upload', path.basename(filename));
            file.pipe(fs.createWriteStream(saveTo));
            file.on('end', function() {
                console.log('ok');
            })
        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            console.log(value)
        });
        req.pipe(req.busboy);
    }
});

app.listen(3000, function() {
    console.log('port:3000');
})
