class KittleInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default attributes
    this.type = this.getAttribute("type") || "text";
    this.placeholder = this.getAttribute("placeholder") || "Enter text...";
    this.size = this.getAttribute("size") || "medium";
    this.color = this.getAttribute("color") || "#fff";
    this.bgColor = this.getAttribute("bg-color") || "rgba(30, 30, 30, 0.7)";
    this.styleType = this.getAttribute("style") || "default";
    this.icon = this.getAttribute("icon") || "";

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: sans-serif;
        }
        
        .input-container {
          position: relative;
          display: flex;
          align-items: center;
          background: ${this.bgColor};
          border-radius: ${this.getBorderRadius()};
          box-shadow: ${this.getBoxShadow()};
          border: ${this.getBorder()};
          padding: 5px 10px;
          backdrop-filter: blur(8px);
          transition: 0.3s ease-in-out;
        }

        .input-container:hover {
          box-shadow: ${this.getHoverShadow()};
        }

        input {
          flex: 1;
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: ${this.getFontSize()};
          color: ${this.color};
          padding: 8px;
        }

        ::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .icon {
          margin-right: 8px;
          font-size: ${this.getFontSize()};
          color: ${this.color};
        }
      </style>

      <div class="input-container">
        ${this.icon ? `<span class="icon">${this.getIconHTML()}</span>` : ""}
        <input type="${this.type}" placeholder="${this.placeholder}">
      </div>
    `;

    // Tambahkan event listener untuk event input
    this.shadowRoot.querySelector("input").addEventListener("input", (e) => {
      this.dispatchEvent(new CustomEvent("input", {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true
      }));
    });
  }

  getBorderRadius() {
    return this.styleType === "rounded" ? "50px" : "5px";
  }

  getBoxShadow() {
    switch (this.styleType) {
      case "shadowed": return "0px 4px 6px rgba(0, 0, 0, 0.3)";
      case "glassy": return "inset 0px 1px 3px rgba(255, 255, 255, 0.1)";
      default: return "none";
    }
  }

  getHoverShadow() {
    return this.styleType === "shadowed" ? "0px 6px 12px rgba(0, 0, 0, 0.4)" : "none";
  }

  getBorder() {
    return this.styleType === "bordered" ? "1px solid rgba(255, 255, 255, 0.3)" : "none";
  }

  getFontSize() {
    return this.size === "small" ? "14px" : this.size === "large" ? "18px" : "16px";
  }

  getIconHTML() {
    if (this.icon === "search") return "🔍";
    if (this.icon === "eye") return "👁";
    return this.icon;
  }

  static get observedAttributes() {
    return ["type", "placeholder", "size", "color", "bg-color", "style", "icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name.replace("-", "")] = newValue;
    this.render();
  }

  // Getter untuk mendapatkan value input
  get value() {
    return this.shadowRoot.querySelector("input").value;
  }

  // Setter untuk mengubah value input dari luar
  set value(val) {
    this.shadowRoot.querySelector("input").value = val;
  }
}

customElements.define("kittle-input", KittleInput);