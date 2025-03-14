class KittleAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const type = this.getAttribute("type") || "info";
    const position = this.getAttribute("position") || "top-right";
    const autoClose = this.hasAttribute("auto-close");
    const closeDelay = this.getAttribute("close-delay") || "3000";
    const animation = this.getAttribute("animation") || "fade"; // fade, slide, scale
    const background = this.getAttribute("background") || this.getTypeColor(type);
    const textColor = this.getAttribute("text-color") || "#fff";
    const borderRadius = this.getAttribute("border-radius") || "8px";
    const shadow = this.getAttribute("shadow") || "0 5px 15px rgba(0, 0, 0, 0.2)";
    const blur = this.hasAttribute("blur") ? "backdrop-filter: blur(10px);" : "";
    const zIndex = this.getAttribute("z-index") || "9999";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          ${this.getPositionStyles(position)}
          z-index: ${zIndex};
          display: none;
        }

        .alert {
          min-width: 250px;
          max-width: 400px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: ${background};
          color: ${textColor};
          border-radius: ${borderRadius};
          box-shadow: ${shadow};
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.4s ease, transform 0.4s ease;
          ${blur}
        }

        .alert.show {
          opacity: 1;
          transform: scale(1);
        }

        .icon {
          font-size: 18px;
        }

        .close-btn {
          margin-left: auto;
          cursor: pointer;
          font-weight: bold;
        }
      </style>

      <div class="alert">
        <span class="icon">${this.getIcon(type)}</span>
        <slot></slot>
        <span class="close-btn">✖</span>
      </div>
    `;

    this.alertBox = this.shadowRoot.querySelector(".alert");
    this.closeButton = this.shadowRoot.querySelector(".close-btn");

    // Event untuk menutup alert
    this.closeButton.addEventListener("click", () => this.hideAlert());

    if (autoClose) {
      setTimeout(() => this.hideAlert(), parseInt(closeDelay));
    }

    // Tampilkan alert dengan animasi
    setTimeout(() => this.showAlert(), 50);
  }

  showAlert() {
    this.style.display = "flex";
    setTimeout(() => this.alertBox.classList.add("show"), 10);
  }

  hideAlert() {
    this.alertBox.classList.remove("show");
    setTimeout(() => (this.style.display = "none"), 400);
  }

  getTypeColor(type) {
    switch (type) {
      case "success": return "rgba(46, 204, 113, 0.8)"; // hijau
      case "error": return "rgba(231, 76, 60, 0.8)"; // merah
      case "warning": return "rgba(241, 196, 15, 0.8)"; // kuning
      case "info": return "rgba(52, 152, 219, 0.8)"; // biru
      default: return "rgba(189, 195, 199, 0.8)"; // abu-abu
    }
  }

  getIcon(type) {
    switch (type) {
      case "success": return "✔"; 
      case "error": return "✖"; 
      case "warning": return "⚠"; 
      case "info": return "ℹ"; 
      default: return "🔔";
    }
  }

  getPositionStyles(position) {
    switch (position) {
      case "top-left": return "top: 10px; left: 10px;";
      case "top-right": return "top: 10px; right: 10px;";
      case "bottom-left": return "bottom: 10px; left: 10px;";
      case "bottom-right": return "bottom: 10px; right: 10px;";
      case "center": return "top: 50%; left: 50%; transform: translate(-50%, -50%);";
      default: return "top: 10px; right: 10px;";
    }
  }
}

customElements.define("kittle-alert", KittleAlert);