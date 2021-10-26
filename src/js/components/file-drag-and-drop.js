import { GenerateGuid } from "../helpers/strings.js";

class FileDragAndDrop {
  constructor($module) {
    this.$module = $module;
    this.$input = $module.querySelector('input[type="file"]');
    this.$icons = $module.querySelector(".fs-file-drag-and-drop__icons");
    this.$label = $module.querySelector(".fs-file-drag-and-drop__label");
    this.iconsDefaultHTML = this.$icons.innerHTML;
    this.labelDefaultHTML = this.$label.innerHTML;
    this.id = `DragAndDrop-${GenerateGuid()}`;
    this.create();
  }
  create() {
    // Add a11y
    this.$label.setAttribute("id", this.id);
    this.$label.setAttribute("aria-live", "polite");
    this.$input.setAttribute(
      "aria-describedby",
      this.$input.getAttribute("aria-describedby")
        ? this.$input.getAttribute("aria-describedby") + " " + this.id
        : this.id
    );
    // Bind events
    this.$input.bindDragOver = this.onDragOver.bind(this);
    this.$input.bindDragOut = this.onDragOut.bind(this);
    this.$input.bindChange = this.onChange.bind(this);
    this.$input.addEventListener("dragenter", this.$input.bindDragOver, true);
    this.$input.addEventListener("dragover", this.$input.bindDragOver, true);
    this.$input.addEventListener("dragleave", this.$input.bindDragOut, true);
    this.$input.addEventListener("drop", this.$input.bindDragOut, true);
    this.$input.addEventListener("change", this.$input.bindChange, true);
  }
  onChange(e) {
    this.handleFiles(e.target.files);
  }
  onDragOver() {
    this.$module.classList.add("fs-file-drag-and-drop--highlight");
  }
  onDragOut() {
    this.$module.classList.remove("fs-file-drag-and-drop--highlight");
  }
  handleFiles(files) {
    this.resetFilePreview();
    if (files.length) {
      let fileNames = [];
      let fileUrls = {};
      this.$icons.innerHTML = "";
      // Loop through files
      [...files].forEach((file) => {
        fileNames.push(file.name);
        // Add image thumbnail (if it's an image)
        if (["image/gif", "image/jpeg", "image/png"].includes(file.type)) {
          let reader = new FileReader();
          reader.onload = (e) => {
            let $previewImg = document.createElement("img");
            $previewImg.setAttribute("alt", file.name);
            $previewImg.classList.add("fs-file-drag-and-drop__icon");
            $previewImg.src = e.target.result;
            this.$icons.appendChild($previewImg);
          };
          reader.readAsDataURL(file);
        }
      });
      // Update label
      if (fileNames.length === 1) {
        this.$label.innerHTML = `Selected file: <strong>${fileNames[0]}</strong>.`;
      } else {
        this.$label.innerHTML = `Selected <strong>${fileNames.length} files</strong>.`;
      }
    }
  }
  resetFilePreview() {
    this.$icons.innerHTML = this.iconsDefaultHTML;
    this.$label.innerHTML = this.labelDefaultHTML;
  }
}

export default FileDragAndDrop;
