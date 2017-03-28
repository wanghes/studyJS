let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
//默认development模式
gulp.task('default',function(){
    nodemon({
        script: './app.js',
         ext: 'js css',
         ignore: ['ignored.js','./val/'],
         env: { 'NODE_ENV': 'development' }
    })
});


gulp.task('nodemon:test',function () {
    nodemon({
      script: './app.js',
      ext: 'js css',
      watch: [
        path.join(__dirname,'/')
      ],
      env: { 'NODE_ENV': 'test' }
    })
});


gulp.task('nodemon:production',function () {
    nodemon({
      script: './app.js',
      ext: 'js css',
      watch: [
        path.join(__dirname,'/')
      ],
      env: { 'NODE_ENV': 'production' }
    })
});