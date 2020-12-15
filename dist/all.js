(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.fs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAll = initAll;
Object.defineProperty(exports, "TextareaCounter", {
  enumerable: true,
  get: function () {
    return _textareaCounter.default;
  }
});

var _textareaCounter = _interopRequireDefault(require("./components/textarea-counter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAll(options) {
  options = typeof options !== "undefined" ? options : {}; // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set

  const scope = typeof options.scope !== "undefined" ? options.scope : document;
  scope.querySelectorAll('[data-module="fs-textarea-counter"]').forEach(m => {
    new _textareaCounter.default(m);
  });
}

},{"./components/textarea-counter":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class TextareaCounter {
  constructor($module) {
    this.$module = $module;
    this.$textarea = $module.querySelector("textarea");
    this.$counter = this.buildCounterHtml(); // Activate!

    this.updateCounter(); // Bind input event

    this.$textarea.addEventListener("input", () => {
      this.updateCounter();
    });
  }

  buildCounterHtml() {
    if (!this.$textarea.id) {
      console.error("TextareaCounter: Textarea must have a unique `id` attribute set to attach a character counter.");
      return;
    }

    if (!this.$textarea.maxLength) {
      console.error("TextareaCounter: Textarea must have a `maxlength` attribute set to attach a character counter.");
      return;
    }

    this.maxlength = this.$textarea.maxLength;
    const counterId = this.$textarea.id + "-Counter"; // Add `aria-describedby` attribute to textarea

    if (this.$textarea.getAttribute("aria-describedby")) {
      const describedBy = this.$textarea.getAttribute("aria-describedby");
      this.$textarea.setAttribute("aria-describedby", `${describedBy} ${counterId}`);
    } else {
      this.$textarea.setAttribute("aria-describedby", counterId);
    } // Remove maxlength attribute as we're going to validate that separately now


    this.$textarea.removeAttribute("maxlength"); // Create counter HTML

    const $counterContainer = document.createElement("div");
    $counterContainer.setAttribute("id", counterId);
    $counterContainer.classList.add("fs-textarea-counter__counter"); // Append

    this.$module.appendChild($counterContainer);
    return $counterContainer;
  }

  updateCounter() {
    const count = this.count();
    let counterText = "";

    if (count.tooLong) {
      counterText = count.charactersOver === 1 ? `Limit reached. You're over by ${count.charactersOver} character.` : `Limit reached. You're over by ${count.charactersOver} characters.`;
      this.$counter.setAttribute("role", "alert");
      this.$textarea.setCustomValidity(`Input is too long. A maximum of ${count.maxlength} characters are allowed. You have used ${count.charactersUsed} characters.`);
    } else {
      counterText = count.charactersRemaining === 1 ? `You have ${count.charactersRemaining} character remaining.` : `You have ${count.charactersRemaining} characters remaining.`;
      this.$counter.removeAttribute("role");
      this.$textarea.setCustomValidity("");
    }

    this.$counter.innerText = counterText;
    this.$counter.setAttribute("aria-live", count.charactersRemaining < 1 ? "assertive" : "polite");
  }

  count() {
    const charactersRemaining = this.maxlength - this.$textarea.value.length;
    return {
      maxlength: this.maxlength,
      charactersUsed: this.$textarea.value.length,
      charactersRemaining: charactersRemaining,
      charactersOver: charactersRemaining < 0 ? Math.abs(charactersRemaining) : 0,
      tooLong: charactersRemaining < 0 ? true : false
    };
  }

}

exports.default = TextareaCounter;

},{}]},{},[1])(1)
});

//# sourceMappingURL=all.js.map
