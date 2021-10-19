import { GenerateGuid } from "../helpers/strings.js";
import { KeyCodes } from "../helpers/key-codes.js";

class Tooltip {
  constructor($module) {
    this.$module = $module;
    this.$trigger = $module.firstElementChild;
    this.$tooltip = $module.querySelector(".fs-tooltip__tip");
    this.timeoutId = null;
    this.timeoutLength = 500; // milliseconds
    this.tooltipOriginalId = this.$tooltip.id;
    this.tooltipId = this.tooltipOriginalId || `tooltip-${GenerateGuid()}`;
    // There's no tooltip, exit
    if (!this.$trigger || !this.$tooltip) {
      return;
    }
    this.create();
  }
  create() {
    // Tooltip a11y
    this.$tooltip.setAttribute("id", this.tooltipId);
    this.$tooltip.setAttribute("aria-hidden", "true");
    // Trigger events
    this.$trigger.boundMouseEnter = this.onFocus.bind(this);
    this.$trigger.boundMouseLeave = this.onMouseLeave.bind(this);
    this.$trigger.boundFocus = this.onFocus.bind(this);
    this.$trigger.boundBlur = this.onBlur.bind(this);
    this.$trigger.boundEscape = this.onEscape.bind(this);
    this.$trigger.addEventListener(
      "mouseenter",
      this.$trigger.boundMouseEnter,
      true
    );
    this.$trigger.addEventListener(
      "mouseleave",
      this.$trigger.boundMouseLeave,
      true
    );
    this.$trigger.addEventListener("focus", this.$trigger.boundFocus, true);
    this.$trigger.addEventListener("blur", this.$trigger.boundBlur, true);
    this.$trigger.addEventListener("keydown", this.$trigger.boundEscape, true);
    this.hideTooltip();
  }
  destroy() {
    if (this.tooltipOriginalId) {
      this.$tooltip.setAttribute("id", this.tooltipOriginalId);
    } else {
      this.$tooltip.removeAttribute("id");
    }
    this.$tooltip.removeAttribute("aria-hidden");
    this.$trigger.removeEventListener(
      "mouseenter",
      this.$trigger.boundMouseEnter,
      true
    );
    this.$trigger.removeEventListener(
      "mouseleave",
      this.$trigger.boundMouseLeave,
      true
    );
    this.$trigger.removeEventListener("focus", this.$trigger.boundFocus, true);
    this.$trigger.removeEventListener("blur", this.$trigger.boundBlur, true);
    this.$trigger.removeEventListener(
      "keydown",
      this.$trigger.boundEscape,
      true
    );
  }
  onFocus() {
    this.showTooltip();
  }
  onBlur() {
    this.hideTooltip();
  }
  onEscape(e) {
    const code = e.which || e.keyCode;
    if (code === KeyCodes().ESCAPE) {
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
    this.$tooltip.classList.remove("fs-tooltip__tip--hidden");
    this.$tooltip.setAttribute("aria-hidden", "false");
  }
  hideTooltip() {
    this.$tooltip.classList.add("fs-tooltip__tip--hidden");
    this.$tooltip.setAttribute("aria-hidden", "true");
  }
  determinePosition() {
    // Calculate element positions
    const rect = this.$trigger.getBoundingClientRect();
    const spaceAvailable = {
      top: rect.top,
      left: rect.left,
      right: window.innerWidth - rect.right,
      bottom: window.innerHeight - rect.bottom,
    };
    // Iterate though the results to find where we have the most space
    let largestVal = 0;
    let largestKey = null;
    Object.keys(spaceAvailable).map((key) => {
      if (spaceAvailable[key] > largestVal) {
        largestVal = spaceAvailable[key];
        largestKey = key;
      }
    });
    this.$tooltip.dataset.side = largestKey || "bottom";
  }
}

export default Tooltip;
