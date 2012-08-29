"use strict";

var fs = require('fs')
  , burrito = require('burrito')
  , pullDefines = require('./middleware/define');

var middleware = exports.middleware = []

require.extensions['.jsx'] = function(module, filename) {
  var jsx = fs.readFileSync(filename, 'utf8')
  var defines = pullDefines(jsx);
  jsx = defines.src;
  defines = defines.defines;

  for (var i = 0; i < defines.length; i += 1) {
    jsx = burrito(jsx, defines[i]);
  }

  for (var i = 0; i < middleware.length; i += 1) {
    jsx = burrito(jsx, middleware[i])
  }

  //console.log(jsx);

  return module._compile(jsx, filename)
}

exports.use = function(method) {
  middleware.push(method);
}

exports.selfLogging = require('./middleware/self-logging');
