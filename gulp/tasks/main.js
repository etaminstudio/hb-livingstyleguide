'use strict';

var config = require('../config');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');

// By default, serve and watch
gulp.task('default', ['harp:serve', 'watch:js']);

// Compile with harp
gulp.task('compile', ['harp:compile', 'compile:js']);

// Build everything
gulp.task('build',   ['build:js', 'build:images', 'build:fonts', 'build:css', 'build:css:expanded', 'build:jade', 'build:runtime', 'copy:config', 'copy:locales', 'copy:modernizr'], function () {

  if (fs.existsSync(path.join(config.tmp.output, config.runtime.filename))){
    fs.renameSync(
      path.join(config.tmp.output,              config.runtime.filename),
      path.join(config.build.assets.javascript, config.runtime.filename)
    );
  }
});

// Clean, then build
gulp.task('cleanbuild', function(callback) {
  runSequence('clean', 'build', callback);
});
