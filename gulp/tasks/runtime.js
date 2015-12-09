var gulp        = require('gulp');
var config      = require('../config');
var templatizer = require('templatizer');
var browserify  = require('browserify');
var fs          = require('fs');

gulp.task('build:runtime', ['templatize:runtime'], function () {
  // Standalone Browserify Builds
  // http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds
  browserify(config.tmp.output + '/runtime.tpl.unpkg.js', {standalone: 'Styleguide.templates'})
    .bundle()
    .pipe(fs.createWriteStream(config.tmp.output + '/runtime.tpl.js'));
});

gulp.task('templatize:runtime', function (cb) {
  templatizer(
    config.harp.input+'/modules/!(_*)/*.jade',
    config.tmp.output + '/runtime.tpl.unpkg.js', {
      transformMixins: true,
      globOptions: { ignore: ['**/index.jade'] }
    }, cb);
});


gulp.task('build:clients', function (cb) {
  //gulp.src('./src/javascript/config.js')
  //  .pipe(gulp.dest(config.build.assets.javascript));
  //
  //var clients = config.templatizer.client_modules;
  //
  //templatizer(
  //  config.harp.input+'/modules/@('+clients.join('|')+')/*.jade',
  //  config.harp.input + '/javascript/client.tpl.js', {
  //    transformMixins: true,
  //    globOptions: { ignore: ['**/index.jade'] }
  //  }, cb);
});

