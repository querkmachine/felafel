class TextareaCounter {
  constructor($module) {
    this.$module = $module;
    this.$textarea = $module.querySelector("textarea");
    this.$counter = this.buildCounterHtml();
    // Activate!
    this.updateCounter();
    // Bind input event
    this.$textarea.addEventListener("input", () => {
      this.updateCounter();
    });
  }
  buildCounterHtml() {
    if (!this.$textarea.id) {
      console.error(
        "TextareaCounter: Textarea must have a unique `id` attribute set to attach a character counter."
      );
      return;
    }
    if (!this.$textarea.maxLength) {
      console.error(
        "TextareaCounter: Textarea must have a `maxlength` attribute set to attach a character counter."
      );
      return;
    }
    this.maxlength = this.$textarea.maxLength;
    const counterId = this.$textarea.id + "-Counter";
    // Add `aria-describedby` attribute to textarea
    if (this.$textarea.getAttribute("aria-describedby")) {
      const describedBy = this.$textarea.getAttribute("aria-describedby");
      this.$textarea.setAttribute(
        "aria-describedby",
        `${describedBy} ${counterId}`
      );
    } else {
      this.$textarea.setAttribute("aria-describedby", counterId);
    }
    // Remove maxlength attribute as we're going to validate that separately now
    this.$textarea.removeAttribute("maxlength");
    // Create counter HTML
    const $counterContainer = document.createElement("div");
    $counterContainer.setAttribute("id", counterId);
    $counterContainer.classList.add("fs-textarea-counter__counter");
    // Append
    this.$module.appendChild($counterContainer);
    return $counterContainer;
  }
  updateCounter() {
    const count = this.count();
    let counterText = "";
    if (count.tooLong) {
      counterText =
        count.charactersOver === 1
          ? `Limit reached. You're over by ${count.charactersOver} character.`
          : `Limit reached. You're over by ${count.charactersOver} characters.`;
      this.$counter.setAttribute("role", "alert");
      this.$textarea.setCustomValidity(
        `Input is too long. A maximum of ${count.maxlength} characters are allowed. You have used ${count.charactersUsed} characters.`
      );
    } else {
      counterText =
        count.charactersRemaining === 1
          ? `You have ${count.charactersRemaining} character remaining.`
          : `You have ${count.charactersRemaining} characters remaining.`;
      this.$counter.removeAttribute("role");
      this.$textarea.setCustomValidity("");
    }
    this.$counter.innerText = counterText;
    this.$counter.setAttribute(
      "aria-live",
      count.charactersRemaining < 1 ? "assertive" : "polite"
    );
  }
  count() {
    const charactersRemaining = this.maxlength - this.$textarea.value.length;
    return {
      maxlength: this.maxlength,
      charactersUsed: this.$textarea.value.length,
      charactersRemaining: charactersRemaining,
      charactersOver:
        charactersRemaining < 0 ? Math.abs(charactersRemaining) : 0,
      tooLong: charactersRemaining < 0 ? true : false,
    };
  }
}

export default TextareaCounter;
