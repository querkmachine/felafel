import Tabs from "./components/tabs";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  scope.querySelectorAll('[data-module="tabs"]').forEach((m) => {
    new Tabs(m);
  });
}

export { initAll, Tabs };
