'use strict';

var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var config     = require('../config');
var fs         = require('fs');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var path       = require('path');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');
var watchify   = require('watchify');

var browserifyBundler = browserify('./src/javascript/main.js');
var watchifyBundler   = watchify(browserify('./src/javascript/main.js', watchify.args));

browserifyBundler.transform('jadeify');
watchifyBundler.transform('jadeify');

gulp.task('watch:js', ['build:clients'], watch); // so you can run `watch:js` to build the file
gulp.task('compile:js', ['build:clients'], compile); // so you can run `compile:js` to build the file
gulp.task('build:js', ['build:clients'], build); // so you can run `gulp build:js` to build the file
gulp.task('copy:config', copyConfig);
gulp.task('copy:locales', copyLocales);
gulp.task('copy:modernizr', copyModernizr);

watchifyBundler.on('update', watch); // on any dep update, runs the watchifyBundler
watchifyBundler.on('log', gutil.log); // output build logs to terminal


function watch() {
  watchifyBundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Watchify Error'))
    .pipe(source(config.js.output))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(config.src, 'javascript')));
}

function compile() {
  bundle(path.join(config.harp.output, 'javascript'));
}

function build () {
  bundle(config.build.assets.javascript);
}

function bundle(output) {
  return browserifyBundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(config.js.output))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(output)) ;
}

function copyConfig() {
  gulp.src('./src/javascript/config.js')
    .pipe(gulp.dest(config.build.assets.javascript));
}

function copyLocales() {
  gulp.src('./src/javascript/locales.js')
    .pipe(gulp.dest(config.build.assets.javascript));
}

function copyModernizr() {
  gulp.src('./src/javascript/lib/modernizr.custom.js')
    .pipe(gulp.dest(config.build.assets.javascriptLib));
}
