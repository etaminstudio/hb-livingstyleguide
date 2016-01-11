'use strict';

var config = require('../config');
var gulp = require('gulp');
var gulpFilter = require('gulp-filter');
var imagemin = require('gulp-imagemin');
var path = require('path');

var imageFilter = gulpFilter([
  '**/*.png',
  '**/*.jpg',
  '**/*.svg',
  '**/*.gif',
  '**/*.ico'
]);

// Optimize images and copy them to the build
gulp.task('build:images', function () {
  return gulp.src(['src/**/*', '!' + path.join(config.fonts.input, '**')])
    .pipe(imageFilter)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(path.join(config.build.assets.images)));
});
