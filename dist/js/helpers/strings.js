// Generate a GUID. Matches the RFC, but no real guarantee of uniqueness.
function GenerateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export { GenerateGuid };

//# sourceMappingURL=strings.js.map