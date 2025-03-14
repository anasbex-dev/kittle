class KittleLoading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Default attributes
    this.styleType = this.getAttribute("style") || "dots";
    this.size = this.getAttribute("size") || "medium";
    this.color = this.getAttribute("color") || "#00aaff";
    this.speed = this.getAttribute("speed") || "normal";
    this.autoHide = this.getAttribute("auto-hide") === "true";

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 9999;
          transition: opacity 0.3s ease-in-out;
        }

        :host([hidden]) {
          display: none;
        }

        /* Dots */
        .dots {
          display: flex;
          gap: 5px;
        }
        .dots div {
          width: ${this.getSize()};
          height: ${this.getSize()};
          background: ${this.color};
          border-radius: 50%;
          animation: bounce ${this.getSpeed()} infinite ease-in-out;
        }
        .dots div:nth-child(2) { animation-delay: 0.2s; }
        .dots div:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }

        /* Wave */
        .wave {
          display: flex;
          gap: 5px;
        }
        .wave div {
          width: 4px;
          height: ${this.getSize()};
          background: ${this.color};
          animation: wave ${this.getSpeed()} infinite ease-in-out;
        }
        .wave div:nth-child(2) { animation-delay: 0.2s; }
        .wave div:nth-child(3) { animation-delay: 0.4s; }

        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(1); }
          20% { transform: scaleY(1.5); }
        }

        /* iPhone Style */
        .iphone div {
          width: ${this.getSize()};
          height: ${this.getSize()};
          background: ${this.color};
          border-radius: 50%;
          animation: iphoneBounce ${this.getSpeed()} infinite ease-in-out;
        }
        
        @keyframes iphoneBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }

        /* Spiral */
        .spiral {
          border: 5px solid transparent;
          border-top: 5px solid ${this.color};
          border-radius: 50%;
          width: ${this.getSize()};
          height: ${this.getSize()};
          animation: spin ${this.getSpeed()} linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Spinner */
        .spinner {
          border: 4px solid ${this.color};
          border-top: 4px solid transparent;
          border-radius: 50%;
          width: ${this.getSize()};
          height: ${this.getSize()};
          animation: spin ${this.getSpeed()} linear infinite;
        }

        /* Pulse */
        .pulse {
          width: ${this.getSize()};
          height: ${this.getSize()};
          background: ${this.color};
          border-radius: 50%;
          animation: pulse ${this.getSpeed()} infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Cube Rotation */
        .cube-rotate {
          width: ${this.getSize()};
          height: ${this.getSize()};
          background: ${this.color};
          animation: cubeRotate ${this.getSpeed()} infinite;
        }

        @keyframes cubeRotate {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }

      </style>

      <div class="${this.styleType}">
        ${this.getInnerHTML()}
      </div>
    `;

    if (this.autoHide) {
      setTimeout(() => this.hide(), 3000);
    }
  }

  getSize() {
    return this.size === "small" ? "20px" : this.size === "large" ? "50px" : "30px";
  }

  getSpeed() {
    return this.speed === "slow" ? "1.5s" : this.speed === "fast" ? "0.5s" : "1s";
  }

  getInnerHTML() {
    switch (this.styleType) {
      case "dots":
        return '<div></div><div></div><div></div>';
      case "wave":
        return '<div></div><div></div><div></div>';
      case "iphone":
        return '<div></div>';
      case "spiral":
        return '<div></div>';
      case "spinner":
        return '<div></div>';
      case "pulse":
        return '<div></div>';
      case "cube-rotate":
        return '<div></div>';
      default:
        return '<div></div>';
    }
  }

  show() {
    this.removeAttribute("hidden");
  }

  hide() {
    this.setAttribute("hidden", "");
  }

  static get observedAttributes() {
    return ["style", "size", "color", "speed"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }
}

customElements.define("kittle-loading", KittleLoading);