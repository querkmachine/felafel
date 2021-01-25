import DetailsGroup from "./components/details-group";
import FileDragAndDrop from "./components/file-drag-and-drop";
import Tabs from "./components/tabs";
import TextareaCounter from "./components/textarea-counter";
import Tooltip from "./components/tooltip";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};

  // Scope initialization to only certain parts of the page
  // Defaults to entire document if not set
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  scope.querySelectorAll('[data-module="fs-details-group"]').forEach((m) => {
    new DetailsGroup(m);
  });

  scope
    .querySelectorAll('[data-module="fs-file-drag-and-drop"]')
    .forEach((m) => {
      new FileDragAndDrop(m);
    });

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

export {
  initAll,
  DetailsGroup,
  FileDragAndDrop,
  Tabs,
  TextareaCounter,
  Tooltip,
};
