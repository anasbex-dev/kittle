class KittleAnimation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Ambil atribut dari HTML
    this.animation = this.getAttribute("animation") || "fade-in";
    this.duration = this.getAttribute("duration") || "1s";
    this.delay = this.getAttribute("delay") || "0s";
    this.iteration = this.getAttribute("iteration") || "1";

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        ::slotted(*) {
          animation: var(--animation-type) var(--animation-duration) var(--animation-delay) var(--animation-iteration) ease-in-out;
        }

        /* Animasi */
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-down { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slide-left { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slide-right { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes zoom-out { from { transform: scale(1.2); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25%, 75% { transform: translateX(-5px); } 50% { transform: translateX(5px); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes flip { from { transform: rotateY(0); } to { transform: rotateY(180deg); } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes heartbeat { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes swing { 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); } 100% { transform: rotate(0deg); } }

      </style>

      <slot></slot>
    `;

    this.updateAnimation();
  }

  updateAnimation() {
    this.style.setProperty("--animation-type", this.getAnimationType());
    this.style.setProperty("--animation-duration", this.duration);
    this.style.setProperty("--animation-delay", this.delay);
    this.style.setProperty("--animation-iteration", this.iteration);
  }

  getAnimationType() {
    const animations = {
      "fade-in": "fade-in",
      "fade-out": "fade-out",
      "slide-up": "slide-up",
      "slide-down": "slide-down",
      "slide-left": "slide-left",
      "slide-right": "slide-right",
      "zoom-in": "zoom-in",
      "zoom-out": "zoom-out",
      "rotate": "rotate",
      "shake": "shake",
      "bounce": "bounce",
      "flip": "flip",
      "pulse": "pulse",
      "heartbeat": "heartbeat",
      "swing": "swing"
    };
    return animations[this.animation] || "fade-in";
  }

  static get observedAttributes() {
    return ["animation", "duration", "delay", "iteration"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.updateAnimation();
  }
}

customElements.define("kittle-animation", KittleAnimation);