class KittleFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["rounded", "pd", "mg", "content-position", "bg-color", "color", "style"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = "";

    // Ambil atribut
    const rounded = this.getAttribute("rounded") || "8px";
    const pd = this.getAttribute("pd") || "16px";
    const mg = this.getAttribute("mg") || "0px";
    const contentPosition = this.getAttribute("content-position") || "center";
    const bgColor = this.getAttribute("bg-color") || "rgba(20, 20, 20, 0.9)";
    const textColor = this.getAttribute("color") || "#ffffff";
    const styleOption = this.getAttribute("style") || "default";

    // Gaya default soft dark blur
    const baseStyle = `
      :host {
        display: block;
        max-width: 100vw;
        border-radius: ${rounded};
        padding: ${pd};
        margin: ${mg};
        background: ${bgColor};
        color: ${textColor};
        backdrop-filter: blur(10px);
        font-family: Arial, sans-serif;
        text-align: ${contentPosition};
      }
    `;

    // 10 Gaya sampel footer
    const styles = {
      "default": "",
      "minimalist": "border-top: 2px solid #fff; padding: 12px;",
      "glass": "background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(15px);",
      "shadow": "box-shadow: 0 4px 10px rgba(0,0,0,0.2);",
      "bordered": "border: 2px solid #fff;",
      "gradient-dark": "background: linear-gradient(90deg, #222, #444);",
      "gradient-light": "background: linear-gradient(90deg, #eee, #ccc); color: #000;",
      "card": "box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 12px;",
      "neon": "box-shadow: 0 0 10px #0ff; text-shadow: 0 0 5px #0ff;",
      "elegant": "font-style: italic; font-size: 1.1em;",
      "modern": "text-transform: uppercase; letter-spacing: 2px;",
    };

    // Tambahkan style yang dipilih
    const selectedStyle = styles[styleOption] || "";

    // Buat elemen style
    const style = document.createElement("style");
    style.textContent = `${baseStyle} ${selectedStyle}`;

    // Buat slot untuk konten footer
    const slot = document.createElement("slot");

    // Tambahkan elemen ke shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(slot);
  }
}

// Daftarkan custom element
customElements.define("kittle-footer", KittleFooter);