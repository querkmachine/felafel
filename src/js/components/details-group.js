class DetailsGroup {
  constructor($container) {
    this.$container = $container;
    this.$allModules = $container.querySelectorAll(".fs-details");
    this.create();
  }
  create() {
    this.$allModules.forEach(($module) => {
      $module.bindToggle = this.onToggle.bind(this);
      $module.addEventListener("toggle", $module.bindToggle);
    });
  }
  destroy() {
    this.$allModules.forEach(($module) => {
      $module.removeEventListener("toggle", $module.bindToggle);
    });
  }
  onToggle(e) {
    if (!e.target.hasAttribute("open")) {
      return;
    }
    const $openModules = Array.from(
      this.$container.querySelectorAll(".fs-details[open]")
    );
    $openModules.forEach(($module) => {
      if ($module === e.target) {
        return;
      }
      $module.removeAttribute("open");
    });
  }
}

export default DetailsGroup;
