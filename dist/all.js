(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAll = initAll;
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () {
    return _tabs.default;
  }
});

var _tabs = _interopRequireDefault(require("./components/tabs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAll(options) {
  options = typeof options !== "undefined" ? options : {}; // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set

  const scope = typeof options.scope !== "undefined" ? options.scope : document;
  scope.querySelectorAll('[data-module="tabs"]').forEach(m => {
    new _tabs.default(m);
  });
}

},{"./components/tabs":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Tabs {
  constructor() {
    console.log("tabs!");
  }

}

exports.default = Tabs;

},{}]},{},[1])(1)
});

//# sourceMappingURL=all.js.map
