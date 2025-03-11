class KittleGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const columns = this.getAttribute("columns") || "3";
    const gap = this.getAttribute("gap") || "16px";
    const padding = this.getAttribute("padding") || "16px";
    const margin = this.getAttribute("margin") || "0px";
    const bgColor = this.getAttribute("bg-color") || "transparent";
    const border = this.getAttribute("border") || "none";
    const rounded = this.getAttribute("rounded") || "8px";
    const shadow = this.hasAttribute("shadow") ? "0px 4px 15px rgba(0, 0, 0, 0.2)" : "none";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .kittle-grid {
          display: grid;
          grid-template-columns: repeat(${columns}, 1fr);
          gap: ${gap};
          padding: ${padding};
          margin: ${margin};
          background: ${bgColor};
          border: ${border};
          border-radius: ${rounded};
          box-shadow: ${shadow};
          transition: all 0.3s ease-in-out;
        }

        /* Responsif */
        @media (max-width: 768px) {
          .kittle-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .kittle-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      </style>
      <div class="kittle-grid">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("kittle-grid", KittleGrid);