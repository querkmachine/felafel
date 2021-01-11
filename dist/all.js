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
Object.defineProperty(exports, "TextareaCounter", {
  enumerable: true,
  get: function () {
    return _textareaCounter.default;
  }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () {
    return _tooltip.default;
  }
});

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _textareaCounter = _interopRequireDefault(require("./components/textarea-counter"));

var _tooltip = _interopRequireDefault(require("./components/tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAll(options) {
  options = typeof options !== "undefined" ? options : {}; // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set

  const scope = typeof options.scope !== "undefined" ? options.scope : document;
  scope.querySelectorAll('[data-module="fs-tabs"]').forEach(m => {
    new _tabs.default(m);
  });
  scope.querySelectorAll('[data-module="fs-textarea-counter"]').forEach(m => {
    new _textareaCounter.default(m);
  });
  scope.querySelectorAll('[data-module="fs-tooltip"]').forEach(m => {
    new _tooltip.default(m);
  });
}

},{"./components/tabs":2,"./components/textarea-counter":3,"./components/tooltip":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyCodes = require("../helpers/key-codes");

// This component's JS is heavily based on that produced by the Government Digital Service.
// Hat tip to them and the GOV.UK team.
// https://github.com/alphagov/govuk-frontend/blob/master/src/govuk/components/tabs/tabs.js
class Tab {
  constructor($module) {
    this.$module = $module;
    this.$tabs = $module.querySelectorAll(".fs-tabs__tab");
    this.$tablist = $module.querySelector(".fs-tabs__list");
    this.$tablistItems = $module.querySelectorAll(".fs-tabs__item");
    this.panelHiddenClass = "fs-tabs__panel--hidden"; // If we're missing any part, exit now or things will break

    if (!this.$tabs || !this.$tablist || !this.$tablistItems) {
      return;
    }

    this.create();
  }
  /**
   * Initialisation methods
   */


  create() {
    // Setup a11y roles
    this.$tablist.setAttribute("role", "tablist");
    this.$tablistItems.forEach($item => {
      $item.setAttribute("role", "presentation");
    }); // Tab functionality

    this.$tabs.forEach($item => {
      this.setAttributes($item);
      $item.boundTabClick = this.onTabClick.bind(this);
      $item.boundTabKeydown = this.onTabKeydown.bind(this);
      $item.addEventListener("click", $item.boundTabClick, true);
      $item.addEventListener("keydown", $item.boundTabKeydown, true);
      this.hideTab($item);
    }); // Set active tab

    const $activeTab = this.getTab(window.location.hash) || this.$tabs[0];
    this.showTab($activeTab); // Hashchange events

    this.$module.boundOnHashChange = this.onHashChange.bind(this);
    window.addEventListener("hashchange", this.$module.boundOnHashChange, true);
  }

  destroy() {
    // Remove a11y roles
    this.$tablist.removeAttribute("role");
    this.$tablistItems.forEach($item => {
      $item.removeAttribute("role", "presentation");
    }); // Remove tab functionality

    this.$tabs.forEach($item => {
      $item.removeEventListener("click", $item.boundTabClick, true);
      $item.removeEventListener("keydown", $item.boundTabKeydown, true);
      this.unsetAttributes($item);
    }); // Remove hashchange event

    window.removeEventListener("hashchange", this.$module.boundOnHashChange, true);
  }

  setAttributes($tab) {
    // Set default tab attributes
    const panelId = this.getHref($tab).slice(1);
    $tab.setAttribute("id", panelId + "-Tab");
    $tab.setAttribute("role", "tab");
    $tab.setAttribute("aria-controls", panelId);
    $tab.setAttribute("aria-selected", "false");
    $tab.setAttribute("tabindex", "-1"); // Set default panel attributes

    const $panel = this.getPanel($tab);
    $panel.setAttribute("role", "tabpanel");
    $panel.setAttribute("aria-labelledby", $tab.id);
    $panel.classList.add(this.panelHiddenClass);
  }

  unsetAttributes($tab) {
    // Unset tab attributes
    $tab.removeAttribute("id");
    $tab.removeAttribute("role");
    $tab.removeAttribute("aria-controls");
    $tab.removeAttribute("aria-selected");
    $tab.removeAttribute("tabindex"); // Unset panel attributes

    const $panel = this.getPanel($tab);
    $panel.removeAttribute("role");
    $panel.removeAttribute("aria-labelledby");
    $panel.classList.remove(this.panelHiddenClass);
  }
  /**
   * Hash/history usage
   */


  onHashChange(e) {
    const $hashTab = this.getTab(window.location.hash);

    if (!$hashTab) {
      return;
    } // Prevent changing hash


    if (this.changingHash) {
      this.changingHash = false;
      return;
    } // Set active tba according to URL hash


    const $previousTab = this.getCurrentTab();
    this.hideTab($previousTab);
    this.showTab($hashTab);
    $hashTab.focus();
  }

  createHistoryEntry($tab) {
    let $panel = this.getPanel($tab); // This code prevents the page from jumping to the new target hash.
    // 1. Saves the panel ID into memory.
    // 2. Remove the ID from the panel.
    // 3. Change the hash in the URL.
    // 4. Applies the ID from memory back to the panel.

    const id = $panel.id;
    $panel.id = "";
    this.changingHash = true;
    window.location.hash = this.getHref($tab).slice(1);
    $panel.id = id;
  }
  /**
   * Tab methods
   */


  getTab(hash) {
    return this.$module.querySelector(`.fs-tabs__tab[href="${hash}"]`);
  }

  getCurrentTab() {
    return this.$module.querySelector(".fs-tabs__item--current .fs-tabs__tab");
  }

  hideTab($tab) {
    this.unhighlightTab($tab);
    this.hidePanel($tab);
  }

  showTab($tab) {
    this.highlightTab($tab);
    this.showPanel($tab);
  }

  unhighlightTab($tab) {
    $tab.setAttribute("aria-selected", "false");
    $tab.parentNode.classList.remove("fs-tabs__item--current");
    $tab.setAttribute("tabindex", "-1");
  }

  highlightTab($tab) {
    $tab.setAttribute("aria-selected", "true");
    $tab.parentNode.classList.add("fs-tabs__item--current");
    $tab.setAttribute("tabindex", "0");
  }

  activateNextTab() {
    const $currentTab = this.getCurrentTab();
    const $nextTablistItem = $currentTab.parentNode.nextElementSibling;
    let $nextTab;

    if ($nextTablistItem) {
      $nextTab = $nextTablistItem.querySelector(".fs-tabs__tab");
    }

    if ($nextTab) {
      this.hideTab($currentTab);
      this.showTab($nextTab);
      $nextTab.focus();
      this.createHistoryEntry($nextTab);
    }
  }

  activatePreviousTab() {
    const $currentTab = this.getCurrentTab();
    const $previousTablistItem = $currentTab.parentNode.previousElementSibling;
    let $previousTab;

    if ($previousTablistItem) {
      $previousTab = $previousTablistItem.querySelector(".fs-tabs__tab");
    }

    if ($previousTab) {
      this.hideTab($currentTab);
      this.showTab($previousTab);
      $previousTab.focus();
      this.createHistoryEntry($previousTab);
    }
  }
  /**
   * Panel methods
   */


  getPanel($tab) {
    return this.$module.querySelector(this.getHref($tab));
  }

  showPanel($tab) {
    const $panel = this.getPanel($tab);
    $panel.classList.remove(this.panelHiddenClass);
  }

  hidePanel($tab) {
    const $panel = this.getPanel($tab);
    $panel.classList.add(this.panelHiddenClass);
  }
  /**
   * Mouse/keyboard handlers
   */


  onTabClick(e) {
    if (!e.target.classList.contains("fs-tabs__tab")) {
      return false;
    }

    e.preventDefault();
    const $newTab = e.target;
    const $currentTab = this.getCurrentTab();
    this.hideTab($currentTab);
    this.showTab($newTab);
    this.createHistoryEntry($newTab);
  }

  onTabKeydown(e) {
    switch (e.which || e.keyCode) {
      case (0, _keyCodes.KeyCodes)().LEFT:
      case (0, _keyCodes.KeyCodes)().UP:
        this.activatePreviousTab();
        e.preventDefault();
        break;

      case (0, _keyCodes.KeyCodes)().RIGHT:
      case (0, _keyCodes.KeyCodes)().DOWN:
        this.activateNextTab();
        e.preventDefault();
        break;
    }
  }
  /**
   * Helpers
   */


  getHref($tab) {
    const href = $tab.getAttribute("href");
    const hash = href.slice(href.indexOf("#"), href.length);
    return hash;
  }

}

exports.default = Tab;

},{"../helpers/key-codes":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _strings = require("../helpers/strings");

var _keyCodes = require("../helpers/key-codes");

class Tooltip {
  constructor($module) {
    this.$module = $module;
    this.$trigger = $module.firstElementChild;
    this.$tooltip = $module.querySelector('.fs-tooltip__tip');
    this.timeoutId = null;
    this.timeoutLength = 500; // milliseconds

    this.tooltipOriginalId = this.$tooltip.id;
    this.tooltipId = this.tooltipOriginalId || `tooltip-${(0, _strings.GenerateGuid)()}`; // There's no tooltip, exit

    if (!this.$trigger || !this.$tooltip) {
      return;
    }

    this.create();
  }

  create() {
    // Tooltip a11y
    this.$tooltip.setAttribute('id', this.tooltipId);
    this.$tooltip.setAttribute('aria-hidden', 'true'); // Trigger events

    this.$trigger.boundMouseEnter = this.onFocus.bind(this);
    this.$trigger.boundMouseLeave = this.onMouseLeave.bind(this);
    this.$trigger.boundFocus = this.onFocus.bind(this);
    this.$trigger.boundBlur = this.onBlur.bind(this);
    this.$trigger.boundEscape = this.onEscape.bind(this);
    this.$trigger.addEventListener('mouseenter', this.$trigger.boundMouseEnter, true);
    this.$trigger.addEventListener('mouseleave', this.$trigger.boundMouseLeave, true);
    this.$trigger.addEventListener('focus', this.$trigger.boundFocus, true);
    this.$trigger.addEventListener('blur', this.$trigger.boundBlur, true);
    this.$trigger.addEventListener('keydown', this.$trigger.boundEscape, true);
    this.hideTooltip();
  }

  destroy() {
    if (this.tooltipOriginalId) {
      this.$tooltip.setAttribute('id', this.tooltipOriginalId);
    } else {
      this.$tooltip.removeAttribute('id');
    }

    this.$tooltip.removeAttribute('aria-hidden');
    this.$trigger.removeEventListener('mouseenter', this.$trigger.boundMouseEnter, true);
    this.$trigger.removeEventListener('mouseleave', this.$trigger.boundMouseLeave, true);
    this.$trigger.removeEventListener('focus', this.$trigger.boundFocus, true);
    this.$trigger.removeEventListener('blur', this.$trigger.boundBlur, true);
    this.$trigger.removeEventListener('keydown', this.$trigger.boundEscape, true);
  }

  onFocus() {
    this.showTooltip();
  }

  onBlur() {
    this.hideTooltip();
  }

  onEscape(e) {
    const code = e.which || e.keyCode;

    if (code === (0, _keyCodes.KeyCodes)().ESCAPE) {
      this.hideTooltip();
    }
  }

  onMouseEnter() {
    this.showTooltip();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  onMouseLeave() {
    this.timeoutId = setTimeout(() => {
      this.hideTooltip();
    }, this.timeoutLength);
  }

  showTooltip() {
    this.determinePosition();
    this.$tooltip.classList.remove('fs-tooltip__tip--hidden');
    this.$tooltip.setAttribute('aria-hidden', 'false');
  }

  hideTooltip() {
    this.$tooltip.classList.add('fs-tooltip__tip--hidden');
    this.$tooltip.setAttribute('aria-hidden', 'true');
  }

  determinePosition() {
    // Calculate element positions
    const rect = this.$trigger.getBoundingClientRect();
    const spaceAvailable = {
      top: rect.top,
      left: rect.left,
      right: window.innerWidth - rect.right,
      bottom: window.innerHeight - rect.bottom
    }; // Iterate though the results to find where we have the most space

    let largestVal = 0;
    let largestKey = null;
    Object.keys(spaceAvailable).map(key => {
      if (spaceAvailable[key] > largestVal) {
        largestVal = spaceAvailable[key];
        largestKey = key;
      }
    });
    this.$tooltip.dataset.side = largestKey || 'bottom';
  }

}

exports.default = Tooltip;

},{"../helpers/key-codes":5,"../helpers/strings":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyCodes = KeyCodes;

function KeyCodes() {
  return {
    TAB: 9,
    RETURN: 13,
    ESCAPE: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateGuid = GenerateGuid;

// Generate a GUID. Matches the RFC, but no real guarantee of uniqueness.
function GenerateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

},{}]},{},[1])(1)
});

//# sourceMappingURL=all.js.map
