var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: {
            target: 'http://localhost:4600',
            middleware: function(req, res, next) {
                console.log(req.url);
                next();
            }
        },
        files: ['css/*.*'],
        browser: 'chrome',
        notify: false,
        port: 5001
    });
});


gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: './app.js'
    }).on('start', function() {
        if (!called) {
            cb();
            called = true;
        }
    });
});

gulp.task('default', ['browser-sync'], function() {
    //gulp.watch(['sass/**/*.*', '.submodule/stylus/**/*.*'], ['sass']);
});
