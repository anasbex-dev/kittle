class CardKittle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    const bgColor = this.getAttribute("bg-color") || "#fff";
    const textColor = this.getAttribute("text-color") || "#000";
    const rounded = this.getAttribute("rounded") || "8px";
    const padding = this.getAttribute("padding") || "16px";
    const shadow = this.hasAttribute("shadow") ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none";
    const hoverShadow = this.hasAttribute("hover-shadow") ? "0 6px 20px rgba(0, 0, 0, 0.25)" : shadow;
    const isUnderline = this.hasAttribute("kittle-unline");
    const colorUnline = this.getAttribute("unline-color") || textColor;
    const positionContent = this.getAttribute("position-content") || "center";
    
    // Atur ukuran gambar dari atribut (jika ada)
    const imgWidth = this.getAttribute("img-width") || "100%";
    const imgHeight = this.getAttribute("img-height") || "auto";
    
    // Konversi position-content menjadi flexbox alignment
    let justifyContent = "center";
    let alignItems = "center";
    
    switch (positionContent) {
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
      case "center-vertical":
        alignItems = "center";
        justifyContent = "flex-start";
        break;
      case "center-horizontal":
        justifyContent = "center";
        alignItems = "flex-start";
        break;
      default:
        justifyContent = "center";
        alignItems = "center";
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .card {
          background: ${bgColor};
          color: ${textColor};
          border-radius: ${rounded};
          padding: ${padding};
          box-shadow: ${shadow};
          transition: all 0.3s ease-in-out;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          height: 100%;
        }

        .card:hover {
          box-shadow: ${hoverShadow};
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: ${justifyContent};
          align-items: ${alignItems};
          text-align: ${justifyContent === "center" ? "center" : "left"};
          width: 100%;
        }

        /* Pastikan semua elemen dalam card ikut pindah posisi */
        ::slotted(*) {
          max-width: 100%;
        }

        /* Gambar yang ada dalam card akan mengikuti ukuran atribut */
        ::slotted(img) {
          width: ${imgWidth};
          height: ${imgHeight};
          max-width: 100%;
          border-radius: 5px;
        }

        /* Efek garis bawah */
        ${isUnderline ? `
        .card::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0%;
          height: 4px;
          background: ${colorUnline};
          transition: width 0.3s ease, left 0.3s ease;
        }

        .card:hover::after {
          width: 100%;
          left: 0;
        }
        ` : ""}
      </style>
      <div class="card">
        <div class="card-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("card-kittle", CardKittle);