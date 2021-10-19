function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  const loadModule = (moduleName) => {
    const elements = scope.querySelectorAll(`[data-module="fs-${moduleName}"]`);
    if (elements.length) {
      import(`../src/js/components/${moduleName}.js`)
        .then((m) => {
          elements.forEach((e) => {
            new m.default(e);
          });
        })
        .catch((ex) => {
          console.error(`Failed to import module "${moduleName}".`, ex);
        });
    }
  };

  loadModule("details-group");
  loadModule("file-drag-and-drop");
  loadModule("tabs");
  loadModule("textarea-counter");
  loadModule("tooltip");
}

export { initAll };
