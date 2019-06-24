var express = require('express');
var svgCaptcha = require('svg-captcha');

var app = express();
app.get('/captcha', function(req, res, next) {
    console.log("中间件");
    next();
}, function(req, res) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    console.log(captcha.text)
    res.set('Content-Type', 'image/svg+xml');
    res.status(200).send(captcha.data);
});


app.listen(3000);
