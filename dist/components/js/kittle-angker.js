class KittleAngker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const bgcolor = this.getAttribute("bg-color") || "inherit";
    const href = this.getAttribute("href") || "#";
    const clr = this.getAttribute("color") || "inherit";
    const fs = this.getAttribute("f-sz") || "inherit";
    const pd = this.getAttribute("pd") || "8";
    const mg = this.getAttribute("mg") || "0";
    const fw = this.getAttribute("fw") || "normal";
    const styleAttr = this.getAttribute("style") || "";
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        a {
          background-color: ${bgcolor};
          text-decoration: none;
          color: ${clr};
          font-size: ${fs};
          padding: ${pd};
          margin: ${mg};
          font-weight: ${fw};
          transition: 0.3s;
          ${styleAttr}
        }

        a:hover {
          opacity: 0.8;
        }
      </style>
      <a href="${href}">
        <slot></slot>
      </a>
    `;
  }

  static get observedAttributes() {
    return ["bg-color","href", "color", "f-sz", "pd", "mg", "fw", "style"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define("kittle-a", KittleAngker);