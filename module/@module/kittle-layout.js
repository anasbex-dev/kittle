class KittleLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Ambil atribut custom
    const bgColor = this.getAttribute("bg-color") || "transparent";
    const textColor = this.getAttribute("text-color") || "#000";
    const padding = this.getAttribute("padding") || "16px";
    const margin = this.getAttribute("margin") || "0";
    const shadow = this.hasAttribute("shadow") ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none";
    const zIndex = this.getAttribute("index") || "auto";

    // Ukuran Layout
    const width = this.getAttribute("width") || "auto";
    const height = this.getAttribute("height") || "auto";

    // Rounded corners
    const rounded = this.getAttribute("rounded") || "0px";
    const roundedTL = this.getAttribute("rounded-tl") || rounded;
    const roundedTR = this.getAttribute("rounded-tr") || rounded;
    const roundedBL = this.getAttribute("rounded-bl") || rounded;
    const roundedBR = this.getAttribute("rounded-br") || rounded;

    // Posisi Konten
    const position = this.getAttribute("position-content") || "center";
    let justifyContent = "center";
    let alignItems = "center";

    switch (position) {
      case "top":
        alignItems = "flex-start";
        break;
      case "bottom":
        alignItems = "flex-end";
        break;
      case "left":
        justifyContent = "flex-start";
        break;
      case "right":
        justifyContent = "flex-end";
        break;
      case "vertical-center":
        justifyContent = "center";
        alignItems = "center";
        break;
      case "horizontal-center":
        justifyContent = "center";
        alignItems = "center";
        break;
      default:
        justifyContent = "center";
        alignItems = "center";
        break;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          background: ${bgColor};
          color: ${textColor};
          padding: ${padding};
          margin: ${margin};
          border-radius: ${roundedTL} ${roundedTR} ${roundedBR} ${roundedBL};
          box-shadow: ${shadow};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          z-index: ${zIndex};
          flex-wrap: wrap;
          width: ${width};
          height: ${height};
          transition: all 0.3s ease-in-out;
        }

        ::slotted(*) {
          max-width: auto;
        }

        @media (max-width: 768px) {
          :host {
            padding: calc(${padding} / 2);
            flex-direction: column;
            width: 100%;
          }
        }
      </style>
      <slot></slot>
    `;
  }
}

customElements.define("kittle-layout", KittleLayout);