"use strict";

function pullDefines(src) {
  var defines = []
    , match;

  src = src.split('\n');
  for (var i = 0; i < src.length; i += 1) {
    if (match = src[i].match(/^\s*#define\s+(\S+)\s+(\S+)\s*$/)) {
      defines.push([match[1], match[2]]);
      src[i] = '';
    }
  }

  defines = defines.map(function(v) {
    return function(node) {
      if (node.label() === v[0] || node.start.value === v[0]) {
        node.node[1] = v[1];
      }
    }
  });

  src = src.join('\n');

  return {
    src: src,
    defines: defines
  }
}

module.exports = pullDefines;
