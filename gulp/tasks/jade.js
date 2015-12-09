var gulp   = require('gulp');
var config = require('../config');
var path   = require('path');
var rename = require('gulp-rename');


gulp.task('build:jade:copy', function () {
  gulp.src([
      'src/modules/**/*.jade',
      '!src/modules/**/index.jade',
      '!src/modules/_template/*',
      '!src/modules/_layout.jade',
      'src/modules/**/*.json',
      'src/layouts/**/*.jade',
      '!src/layouts/**/index.jade',
      '!src/layouts/wrapper*.jade',
      '!src/layouts/_wrapper*.jade',
      '!src/layouts/_layout*.jade',
      'src/layouts/**/*.json'
    ], { base: './src/' })
    .pipe(gulp.dest(path.join(config.build.output, 'jade')));
});

gulp.task('build:jade', ['build:jade:copy'], function () {
  gulp.src(path.join('src', 'layouts', '_wrapper.jade'))
    .pipe(rename('wrapper.jade'))
    .pipe(gulp.dest(path.join('build', 'jade', 'layouts')));
});

