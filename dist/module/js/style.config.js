class StyleConfig extends HTMLElement {
  constructor() {
    super();
    this.applyStyles();
  }

  applyStyles() {
    const styles = {
      "--pd": this.getAttribute("pd") || "0",
      "--pd-t": this.getAttribute("pd-t") || "0",
      "--pd-b": this.getAttribute("pd-b") || "0",
      "--pd-l": this.getAttribute("pd-l") || "0",
      "--pd-r": this.getAttribute("pd-r") || "0",
      "--mg": this.getAttribute("mg") || "0",
      "--mg-t": this.getAttribute("mg-t") || "0",
      "--mg-b": this.getAttribute("mg-b") || "0",
      "--mg-l": this.getAttribute("mg-l") || "0",
      "--mg-r": this.getAttribute("mg-r") || "0",
      "--wht": this.getAttribute("wht") || "auto",
      "--hgt": this.getAttribute("hgt") || "auto",
      "--mx-wht": this.getAttribute("mx-wht") || "none",
      "--mx-hgt": this.getAttribute("mx-hgt") || "none",
      "--rounded": this.getAttribute("rounded") || "0px",
      "--bg-color": this.getAttribute("bg-color") || "transparent",
      "--color": this.getAttribute("color") || "#000",
      "--border": this.getAttribute("border") || "none",
      "--border-color": this.getAttribute("border-color") || "#000",
      "--shadow": this.getAttribute("shadow") ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
      "--opcty": this.getAttribute("opcty") || "1",
      "--position": this.getAttribute("position") || "static",
      "--z-index": this.getAttribute("z-index") || "1",
      "--fs": this.getAttribute("fs") || "16px",
      "--fw": this.getAttribute("fw") || "normal",
      "--txt-align": this.getAttribute("txt-align") || "left",
    };

    for (const key in styles) {
      document.documentElement.style.setProperty(key, styles[key]);
    }
  }

  static get observedAttributes() {
    return [
      "pd", "pd-t", "pd-b", "pd-l", "pd-r", "mg", "mg-t", "mg-b", "mg-l", "mg-r",
      "wht", "hgt", "mx-wht", "mx-hgt", "rounded", "bg-color", "color", "border", "border-color",
      "shadow", "opcty", "position", "z-index", "fs", "fw", "txt-align"
    ];
  }

  attributeChangedCallback() {
    this.applyStyles();
  }
}

customElements.define("style-config", StyleConfig);