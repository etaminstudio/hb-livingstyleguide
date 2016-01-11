'use strict';

var path = require('path');
var join = require('path').join;
var tasksPath = join(process.cwd(), 'gulp', 'tasks');

// Load all tasks
require('fs')
  .readdirSync(tasksPath)
  .forEach(function(task) {
    if(path.extname(task) !== '.js') return;
    require(join(tasksPath, task));
  });
