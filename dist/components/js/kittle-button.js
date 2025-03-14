class KittleButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const bgColor = this.getAttribute("bg-color") || "rgba(255, 255, 255, 0.2)";
    const textColor = this.getAttribute("text-color") || "#fff";
    const borderColor = this.getAttribute("border-color") || "rgba(255, 255, 255, 0.4)";
    const width = this.getAttribute("width") || "auto";
    const height = this.getAttribute("height") || "auto";
    const padding = this.getAttribute("padding") || "12px 24px";
    const fontSize = this.getAttribute("font-size") || "16px";
    const rounded = this.getAttribute("rounded") || "12px";
    const outline = this.hasAttribute("outline");
    const blurShadow = this.hasAttribute("blur-shadow");
    const glassEffect = this.hasAttribute("glass"); // Glassmorphism Mode

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        .kittle-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${outline ? "transparent" : bgColor};
          color: ${textColor};
          border: ${outline ? `2px solid ${borderColor}` : "none"};
          border-radius: ${rounded};
          padding: ${padding};
          font-size: ${fontSize};
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          text-align: center;
          outline: none;
          position: relative;
          overflow: hidden;
          backdrop-filter: ${glassEffect ? "blur(10px)" : "none"};
          box-shadow: ${blurShadow ? "0px 4px 15px rgba(255, 255, 255, 0.3)" : "none"};
          min-width: ${width};
          min-height: ${height};
          text-decoration: none;
        }

        .kittle-button:hover {
          background: ${outline ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"};
          box-shadow: ${blurShadow ? "0px 6px 20px rgba(255, 255, 255, 0.4)" : "none"};
        }

        .kittle-button:active {
          transform: scale(0.98);
        }
      </style>
      <button class="kittle-button">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("kittle-button", KittleButton);