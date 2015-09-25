var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var zip = require('gulp-zip');


//minify czyli kompresja calendar.js
gulp.task('default', function(){

gulp.src('public_html/js/calendar.js').pipe(uglify()).pipe(gulp.dest('public_html/build/js/'));

});
//dodawanie za pomocą inject plików js i css do html
gulp.task('index', function () {

return gulp.src('./public_html/**/*.html')
  .pipe(inject(gulp.src('./public_html/**/*.js', {read: false}), {relative: true}))
  .pipe(inject(gulp.src('./public_html/css/*.css', {read: false}), {relative: true}))
  .pipe(gulp.dest('./public_html'));
});
//jshint do calendar.js
gulp.task('jshint', function() {
  gulp.src('./public_html/js/calendar.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//pakowanie zawartosci do zip w folderze dist
gulp.task('zip', function () {
    return gulp.src('public_html/*')
        .pipe(zip('calendar.zip'))
        .pipe(gulp.dest('dist'));
});