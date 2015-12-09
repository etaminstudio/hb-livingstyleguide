var config       = require('../config');
var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build:css', function () {
    gulp.src(['src/stylesheets/styleguide*.scss', 'src/stylesheets/print.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.join(config.build.assets.css)));
});

gulp.task('build:css-exp', function () {
  gulp.src(['src/stylesheets/styleguide*.scss', 'src/stylesheets/print.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(path.join(config.build.assets.cssExpanded)));
});
