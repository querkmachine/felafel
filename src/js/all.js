import Tabs from "./components/tabs";
import TextareaCounter from "./components/textarea-counter";
import Tooltip from "./components/tooltip";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  scope.querySelectorAll('[data-module="fs-tabs"]').forEach((m) => {
    new Tabs(m);
  });

  scope.querySelectorAll('[data-module="fs-textarea-counter"]').forEach((m) => {
    new TextareaCounter(m);
  });

  scope.querySelectorAll('[data-module="fs-tooltip"]').forEach((m) => {
    new Tooltip(m);
  });
}

export { initAll, Tabs, TextareaCounter, Tooltip };
