class KittleLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Ambil atribut custom
    const bgColor = this.getAttribute("bg-color") || "transparent";
    const textColor = this.getAttribute("color") || "#000";

    // Padding & Margin yang lebih fleksibel
    const padding = this.getAttribute("padding") || "16px";
    const paddingTop = this.getAttribute("pd-t") || padding;
    const paddingBottom = this.getAttribute("pd-b") || padding;
    const paddingLeft = this.getAttribute("pd-l") || padding;
    const paddingRight = this.getAttribute("pd-r") || padding;

    const margin = this.getAttribute("margin") || "0";
    const marginTop = this.getAttribute("mg-t") || margin;
    const marginBottom = this.getAttribute("mg-b") || margin;
    const marginLeft = this.getAttribute("mg-l") || margin;
    const marginRight = this.getAttribute("mg-r") || margin;

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

    // Efek tambahan
    const blur = this.getAttribute("blur") || "0px";
    const opacity = this.getAttribute("opacity") || "1";
    
    // Efek blur yang lebih fleksibel
    const opBlur = this.getAttribute("op-blur") || "layout"; // Default hanya layout
    const childBlur = opBlur === "all" ? `blur(${blur})` : "none";
    const layoutBlur = opBlur === "layout" ? `blur(${blur})` : "none";

    // Background Image & Position
    const bgImage = this.getAttribute("bg-image") ? `url(${this.getAttribute("bg-image")})` : "none";
    const bgTfrom = this.getAttribute("bg-tfrom") || "center";

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
          background: ${bgColor} ${bgImage};
          background-size: cover;
          background-position: ${bgTfrom};
          background-repeat: no-repeat;
          color: ${textColor};
          padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
          margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft};
          border-radius: ${roundedTL} ${roundedTR} ${roundedBR} ${roundedBL};
          box-shadow: ${shadow};
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          z-index: ${zIndex};
          flex-wrap: wrap;
          width: ${width};
          height: ${height};
          transition: all 0.3s ease-in-out;
          backdrop-filter: ${layoutBlur}; /* Blur hanya untuk layout */
          opacity: ${opacity};
        }

        ::slotted(*) {
          filter: ${childBlur}; /* Blur untuk anak-anak elemen jika op-blur="all" */
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