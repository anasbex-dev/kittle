class KittleModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const modalType = this.getAttribute("modal-type") || "default";
    const width = this.getAttribute("width") || "400px";
    const height = this.getAttribute("height") || "auto";
    const background = this.getAttribute("background") || "rgba(255, 255, 255, 0.95)";
    const textColor = this.getAttribute("text-color") || "#333";
    const borderRadius = this.getAttribute("border-radius") || "12px";
    const zIndex = this.getAttribute("z-index") || "9999";
    const closeOnOutsideClick = this.hasAttribute("close-outside");
    this.disableScroll = this.hasAttribute("disable-scroll");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(5px);
          justify-content: center;
          align-items: center;
          z-index: ${zIndex};
        }

        :host([open]) {
          display: flex;
        }

        .modal {
          width: ${width};
          height: ${height};
          background: ${background};
          color: ${textColor};
          border-radius: ${borderRadius};
          padding: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          position: relative;
          transition: all 0.4s ease-in-out;
          ${this.getModalAnimation(modalType)}
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 18px;
          cursor: pointer;
          background: none;
          border: none;
          color: ${textColor};
        }

        .modal-content {
          text-align: center;
        }
      </style>

      <div class="modal">
        <button class="close-btn">&times;</button>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    `;

    this.modal = this.shadowRoot.querySelector(".modal");
    this.closeBtn = this.shadowRoot.querySelector(".close-btn");

    this.closeBtn.addEventListener("click", () => this.close());

    if (closeOnOutsideClick) {
      this.addEventListener("click", (event) => {
        if (event.target === this) this.close();
      });
    }
  }

  open() {
    this.setAttribute("open", "");
    if (this.disableScroll) {
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    this.removeAttribute("open");
    if (this.disableScroll) {
      document.body.style.overflow = "";
    }
  }

  getModalAnimation(type) {
    const animations = {
      "default": "transform: scale(0.8); opacity: 0;",
      "fade": "opacity: 0; transform: translateY(-20px);",
      "zoom": "transform: scale(0.5); opacity: 0;",
      "slide-up": "transform: translateY(100%);",
      "slide-down": "transform: translateY(-100%);",
      "slide-left": "transform: translateX(100%);",
      "slide-right": "transform: translateX(-100%);",
      "rotate": "transform: rotate(-10deg) scale(0.8);",
      "bounce": "animation: bounce 0.5s ease-out forwards;",
      "flip": "transform: rotateY(90deg); opacity: 0;",
      "shake": "animation: shake 0.5s ease-in-out;",
      "slide-fade": "animation: fade-slide 0.5s ease-out;",
      "elastic": "transform: scale(0.5) rotate(5deg);",
      "pop": "transform: scale(0.2);",
      "glow": "box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); opacity: 0;",
      "drop": "transform: translateY(-50px); opacity: 0;",
      "rise": "transform: translateY(50px); opacity: 0;",
      "pulse": "animation: pulse 1s ease-in-out infinite;",
      "blurred": "backdrop-filter: blur(10px); opacity: 0;",
      "holographic": "background: linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff); opacity: 0.8;",
      "gradient-slide": "background: linear-gradient(90deg, #ff8a00, #e52e71); opacity: 0;",
      "tilt": "transform: rotate(-5deg); opacity: 0;",
      "glassmorphism": "background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px);",
      "shadow-grow": "box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); opacity: 0;",
      "neon": "box-shadow: 0 0 20px #00ffcc; border: 2px solid #00ffcc;",
      "split": "clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);",
      "fade-zoom": "opacity: 0; transform: scale(0.5);",
      "stretch": "transform: scaleX(0); opacity: 0;",
      "skew": "transform: skewX(-10deg); opacity: 0;",
      "wave": "animation: wave 1s ease-in-out infinite;",
      "spiral": "transform: rotate(360deg) scale(0); opacity: 0;",
      "magnet": "transform: translateX(-30px); opacity: 0;",
      "vibrate": "animation: vibrate 0.5s ease-in-out infinite;",
      "warp": "transform: perspective(600px) rotateX(45deg); opacity: 0;",
      "bubble": "transform: scale(0) translateY(10px); opacity: 0;",
      "fade-rotate": "opacity: 0; transform: rotate(15deg);",
      "3d-tilt": "transform: perspective(1000px) rotateY(20deg);",
      "slow-fade": "opacity: 0; transition: opacity 1.5s;",
      "shatter": "clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%); opacity: 0;",
    };

    return animations[type] || animations["default"];
  }
}

customElements.define("kittle-modal", KittleModal);