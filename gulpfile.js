var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default', function () {
    return gulp.src('angular-hero-ramjet.js')
        .pipe(uglify())
        .pipe(concat('angular-hero-ramjet.min.js'))
        .pipe(gulp.dest('./'));
});
