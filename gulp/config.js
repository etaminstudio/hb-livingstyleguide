'use strict';

var join = require('path').join;
var harpOutput = join(process.cwd(), 'www');
var buildOutput = join(process.cwd(), 'build');
var harpSrc = join(process.cwd(), 'src');
var fontsPath = join(process.cwd(), 'src', 'fonts');

module.exports = {
  port: 9000,

  js: {
    output: 'styleguide.js'
  },

  css: {
    output: 'styleguide.css'
  },

  tmp: {
    output: join(process.cwd(), 'tmp')
  },

  harp: {
    input: harpSrc,
    output: harpOutput
  },

  templatizer: {
    client_modules: [
      // TODO: add here modules you want to access in the front-end
    ]
  },

  build: {
    output: buildOutput,
    assets: {
      css: join(buildOutput, 'assets', 'stylesheets'),
      cssExpanded: join(buildOutput, 'assets', 'stylesheets', 'expanded'),
      javascript: join(buildOutput, 'assets', 'javascript'),
      fonts: join(buildOutput, 'assets', 'fonts'),
      images: join(buildOutput, 'assets', 'images'),
    }
  },

  fontsPath: fontsPath
};
