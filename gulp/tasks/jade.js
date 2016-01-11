'use strict';

var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');

// Copy all jade and json files to the build
gulp.task('build:jade', function () {
  gulp.src([
      'src/modules/**/*.jade',
      '!src/modules/**/index.jade',
      '!src/modules/_template/*',
      '!src/modules/_layout.jade',
      'src/modules/**/*.json',
      'src/layouts/**/*.jade',
      '!src/layouts/**/index.jade',
      '!src/layouts/_layout.jade',
      'src/layouts/**/*.json'
    ], { base: './src/' })
    .pipe(gulp.dest(path.join(config.build.output, 'jade')));
});
