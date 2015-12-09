var gulp   = require('gulp');
var config = require('../config');
var path = require('path');

gulp.task('build:fonts', function () {
  gulp.src(['src/fonts/*'], { base: './src/fonts/' })
    .pipe(gulp.dest(path.join(config.build.assets.fonts)));
});

