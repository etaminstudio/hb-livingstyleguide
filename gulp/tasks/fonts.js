'use strict';

var config = require('../config');
var gulp = require('gulp');
var path = require('path');

// Copy font files to the build
gulp.task('build:fonts', function () {
  gulp.src([path.join(config.fonts.input, '*')], { base: config.fonts.input })
    .pipe(gulp.dest(path.join(config.build.assets.fonts)));
});
