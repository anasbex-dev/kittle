class KittleAngker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const href = this.getAttribute("href") || "#";
    const clr = this.getAttribute("clr") || "inherit"; // Warna teks
    const fs = this.getAttribute("fs") || "inherit"; // Ukuran font
    const pd = this.getAttribute("pd") || "8"; // Padding
    const mg = this.getAttribute("mg") || "0"; // Margin
    const fw = this.getAttribute("fw") || "normal"; // Ketebalan font
    const styleAttr = this.getAttribute("style") || ""; // Atribut tambahan untuk gaya bebas
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        a {
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
    return ["href", "clr", "fs", "pd", "mg", "fw", "style"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define("kittle-a", KittleAngker);