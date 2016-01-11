'use strict';

var join = require('path').join;
var buildOutput = join(process.cwd(), 'build');
var srcInput = join(process.cwd(), 'src');
var harpOutput = join(process.cwd(), 'www');
var fontsPath = join(process.cwd(), 'src', 'fonts');

module.exports = {
  port: 9000,

  src: srcInput,

  js: {
    output: 'project.js'
  },

  css: {
    input: join(srcInput, 'stylesheets', 'project*.scss'),
    output: 'project.css'
  },

  fonts: {
    input: fontsPath
  },

  tmp: {
    output: join(process.cwd(), 'tmp')
  },

  harp: {
    input: srcInput,
    output: harpOutput
  },

  runtime: {
    filename: 'runtime.tpl.js',
    filenameTmp: 'runtime.tpl.unpkg.js',
    clientFilename: 'client.tpl.js',
    clientModules: [
      // TODO: add here modules you want to access in the front-end
      'button'
    ]
  },

  build: {
    output: buildOutput,
    assets: {
      css: join(buildOutput, 'assets', 'stylesheets'),
      cssExpanded: join(buildOutput, 'assets', 'stylesheets', 'expanded'),
      javascript: join(buildOutput, 'assets', 'javascript'),
      javascriptLib: join(buildOutput, 'assets', 'javascript', 'lib'),
      fonts: join(buildOutput, 'assets', 'fonts'),
      images: join(buildOutput, 'assets', 'images')
    }
  }
};
