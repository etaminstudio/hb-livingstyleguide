'use strict';

var config = require('../config');
var gulp = require('gulp');
var harp = require('harp');
var path = require('path');

// Start the styleguide to view it in the browser
gulp.task('harp:serve', function() {
  var projectPath = path.join(process.cwd(), 'src');
  console.log(projectPath);
  harp.server(projectPath, { port: config.port }, function(){
    var hostUrl = "http://localhost:" + config.port + "/";
    console.log("Your server is listening at " + hostUrl);
  });
});

// Compile the styleguide as a static website
gulp.task('harp:compile', function() {
  var projectPath = path.join(process.cwd(), 'src');
  var outputPath = config.harp.output;
  harp.compile(projectPath, outputPath, function(errors, output){
    if(errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }
  });
});
