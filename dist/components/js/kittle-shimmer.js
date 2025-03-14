class KittleShimmer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default attributes
    this.shimmerColor = this.getAttribute("color") || "#e0e0e0";
    this.speed = this.getAttribute("speed") || "1.5s";
    this.radius = this.getAttribute("radius") || "4px";

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow: hidden;
          background: ${this.shimmerColor};
          border-radius: ${this.radius};
        }

        ::slotted(*) {
          visibility: hidden; /* Elemen asli tersembunyi sampai data dimuat */
        }

        .shimmer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          animation: shimmerEffect ${this.speed} infinite linear;
        }

        @keyframes shimmerEffect {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      </style>
      
      <slot></slot> <!-- Elemen asli tetap ada -->
      <div class="shimmer"></div>
    `;
  }

  show() {
    this.shadowRoot.querySelector(".shimmer").style.display = "block";
  }

  hide() {
    this.shadowRoot.querySelector(".shimmer").style.display = "none";
    this.shadowRoot.querySelector("slot").assignedElements().forEach(el => {
      el.style.visibility = "visible"; // Tampilkan elemen asli
    });
  }
}

customElements.define("kittle-shimmer", KittleShimmer);