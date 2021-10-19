(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAll = initAll;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import DetailsGroup from "./components/details-group";
// import FileDragAndDrop from "./components/file-drag-and-drop";
// import Tabs from "./components/tabs";
// import TextareaCounter from "./components/textarea-counter";
// import Tooltip from "./components/tooltip";
function initAll(options) {
  options = typeof options !== "undefined" ? options : {}; // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set

  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  const loadModule = moduleName => {
    const elements = scope.querySelectorAll(`[data-module="fs-${moduleName}"]`);

    if (elements.length) {
      Promise.resolve(`../src/js/components/${moduleName}.js`).then(s => _interopRequireWildcard(require(s))).then(m => {
        elements.forEach(e => {
          new m.default(e);
        });
      }).catch(ex => {
        console.error(`Failed to import module "${moduleName}".`, ex);
      });
    }
  };

  loadModule('details-group');
  loadModule('file-drag-and-drop');
  loadModule('tabs');
  loadModule('textarea-counter');
  loadModule('tooltip');
}

},{}]},{},[1])(1)
});

//# sourceMappingURL=all.js.map
