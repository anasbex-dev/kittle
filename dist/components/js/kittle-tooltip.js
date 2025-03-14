class KittleTooltip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default attributes
    this.position = this.getAttribute("pos") || "top";
    this.bgColor = this.getAttribute("bg") || "rgba(30, 30, 30, 0.9)";
    this.textColor = this.getAttribute("color") || "#fff";
    this.padding = this.getAttribute("pd") || "8px 12px";
    this.radius = this.getAttribute("rad") || "5px";
    this.styleType = this.getAttribute("style-type") || "soft-dark";
    this.delay = this.getAttribute("delay") || "200"; // ms

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }

        .tooltip {
          position: absolute;
          background: ${this.bgColor};
          color: ${this.textColor};
          padding: ${this.padding};
          border-radius: ${this.radius};
          font-size: 14px;
          white-space: nowrap;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          z-index: 1000;
        }

        /* Posisi tooltip */
        .tooltip[pos="top"] {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
        }

        .tooltip[pos="bottom"] {
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-5px);
        }

        .tooltip[pos="left"] {
          right: 100%;
          top: 50%;
          transform: translateX(5px) translateY(-50%);
        }

        .tooltip[pos="right"] {
          left: 100%;
          top: 50%;
          transform: translateX(-5px) translateY(-50%);
        }

        /* Efek Muncul */
        :host(:hover) .tooltip {
          visibility: visible;
          opacity: 1;
          transform: translateX(0) translateY(0);
        }

        /* Gaya Tooltip */
        .soft-dark { background: rgba(30, 30, 30, 0.9); color: #fff; }
        .light { background: #fff; color: #333; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
        .outline { background: transparent; border: 1px solid #ccc; color: #333; }
        .glass { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); color: #fff; }
        .neon { background: #0ff; color: #000; box-shadow: 0 0 10px #0ff; }

      </style>
      <slot></slot>
      <span class="tooltip ${this.styleType}" pos="${this.position}">${this.getAttribute("text") || "Tooltip"}</span>
    `;

    this.setupListeners();
  }

  setupListeners() {
    const tooltip = this.shadowRoot.querySelector(".tooltip");

    this.addEventListener("mouseenter", () => {
      setTimeout(() => {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
      }, this.delay);
    });

    this.addEventListener("mouseleave", () => {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
    });
  }

  static get observedAttributes() {
    return ["pos", "bg", "color", "pd", "rad", "style-type", "delay"];
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("kittle-tooltip", KittleTooltip);