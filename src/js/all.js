(function () {
  // Establish namespace
  const namespace = "fs";
  window[namespace] = {};

  // Modules list
  const modules = [
    "details-group",
    "file-drag-and-drop",
    "tabs",
    "textarea-counter",
    "tooltip",
  ];

  // Module loading function
  const loadModule = (moduleName, options) => {
    // Scope initialization to only certain parts of the page
    // Defaults to entire document if not set
    const scope =
      typeof options.scope !== "undefined" ? options.scope : document;
    const elements = scope.querySelectorAll(
      `[data-module="${namespace}-${moduleName}"]`
    );
    if (elements.length) {
      import(`./components/${moduleName}.js`)
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

  const loadModulePromise = (moduleName) => {
    return import(`./components/${moduleName}.js`);
  };

  const initAll = (options) => {
    options = typeof options !== "undefined" ? options : {};

    modules.forEach((module) => {
      loadModule(module, options);
    });
  };

  window[namespace]["initAll"] = initAll;
  window[namespace]["loadModule"] = loadModulePromise;
})();
