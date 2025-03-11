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
    const colorUnline = this.hasAttribute("unline-color") || "#fff";

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
        }

        .card:hover {
          box-shadow: ${hoverShadow};
        }

        .card-content {
          position: relative;
          z-index: 2;
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