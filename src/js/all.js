import TextareaCounter from "./components/textarea-counter";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  scope.querySelectorAll('[data-module="fs-textarea-counter"]').forEach((m) => {
    new TextareaCounter(m);
  });
}

export { initAll, TextareaCounter };
