"use strict";

function selfLogginFunction(node) {
  if (node.name === 'defun' || node.name === 'function') {
    var fname = node.label() || 'anonymous'
      , line = node.start.line + 1
      , label = [fname, ' (line ', line, ')'].join('');
    node.wrap(function(s) {
      return s.replace(/{/, '{console.log("' + label + '");');
    });
  }
}

module.exports = selfLogginFunction;
