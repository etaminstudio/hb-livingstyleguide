var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var gulpFilter = require('gulp-filter');
var config = require('../config');
var path = require('path');

var imageFilter = gulpFilter([
  '**/*.png',
  '**/*.jpg',
  '**/*.svg',
  '**/*.gif',
  '**/*.ico'
]);

gulp.task('build:images', function () {
  return gulp.src(['src/**/*', '!src/base/fonts/**'])
      .pipe(imageFilter)
      .pipe(imagemin({
          progressive: true,
      }))
      .pipe(gulp.dest(path.join(config.build.assets.images)));
});
