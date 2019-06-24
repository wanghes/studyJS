var gulp = require('gulp');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var path = require('path');
var less = require('gulp-less');
var rename = require('gulp-rename');

gulp.task('clean',function(){
   return gulp.src('app',{read:false})
       .pipe(clean());
});

gulp.task('less',['clean'] , function () {
  return gulp.src('./develop/src/less/flander.less')
    .pipe(less({
      compress: true
    }))
    .pipe(gulp.dest('./develop/dist/css'));
});

gulp.task('js', function () {
  return gulp.src('./develop/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./develop/dist/js'));
});

gulp.task('browserify', ['less','js'], function() {  
  return browserify('./develop/dist/js/main.js')
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(gulp.dest('./develop/dist/js'));
});

gulp.task('usemin', ['browserify'], function() {
   return gulp.src('./develop/origin.html')
        .pipe(rename("index.html"))
        .pipe(usemin({
            js: [  uglify(), rev() ],
            css: [ rev() ],
            inlinejs: [ uglify ]
        }))
        
        .pipe(gulp.dest('./develop'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( './develop/dist' ) );
});



gulp.task('default',['js','less']);

gulp.task('watch',function(){
    // gulp.watch('./develop/src/**/**/**',['less','js']);
	  gulp.watch('./develop/**/**/**/**',['usemin']);
})


