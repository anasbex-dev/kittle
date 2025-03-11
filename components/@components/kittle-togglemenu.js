class KittleToggleMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }
  
  connectedCallback() {
    const position = this.getAttribute("position") || "left";
    const width = this.getAttribute("width") || "250px";
    const height = this.getAttribute("height") || "100%";
    const background = this.getAttribute("background") || "#fff";
    const textColor = this.getAttribute("text-color") || "#333";
    const zIndex = this.getAttribute("z-index") || "1000";
    const closeOnOutsideClick = this.hasAttribute("close-outside");
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          ${position === "left" ? "left: 0; top: 0;" : ""}
          ${position === "right" ? "right: 0; top: 0;" : ""}
          ${position === "top" ? "top: 0; left: 0; width: 100%;" : ""}
          ${position === "bottom" ? "bottom: 0; left: 0; width: 100%;" : ""}
          width: ${width};
          height: ${height};
          background: ${background};
          color: ${textColor};
          z-index: ${zIndex};
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          transition: opacity 0.3s ease-in-out, transform 0.4s ease-in-out;
          ${this.getInitialTransform(position)}
          display: flex;
          flex-direction: column;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }

        :host(.loaded) {
          opacity: 1;
          visibility: visible;
        }

        :host(.open) {
          transform: translate(0, 0);
        }

        .close-btn {
          align-self: flex-end;
          font-size: 18px;
          cursor: pointer;
          background: none;
          border: none;
          color: ${textColor};
          padding: 5px;
        }

        .menu-content {
          flex: 1;
          overflow-y: auto;
        }
      </style>

      <button class="close-btn">&times;</button>
      <div class="menu-content">
        <slot></slot>
      </div>
    `;
    
    this.menu = this.shadowRoot.host;
    this.closeBtn = this.shadowRoot.querySelector(".close-btn");
    
    this.closeBtn.addEventListener("click", () => this.close());
    
    if (closeOnOutsideClick) {
      document.addEventListener("click", (event) => {
        if (!this.contains(event.target) && this.isOpen) {
          this.close();
        }
      });
    }
    
    requestAnimationFrame(() => {
      this.classList.add("loaded");
    });
  }
  
  open() {
    this.classList.add("open");
    this.isOpen = true;
  }
  
  close() {
    this.classList.remove("open");
    this.isOpen = false;
  }
  
  getInitialTransform(position) {
    switch (position) {
      case "left":
        return "transform: translateX(-100%);";
      case "right":
        return "transform: translateX(100%);";
      case "top":
        return "transform: translateY(-100%);";
      case "bottom":
        return "transform: translateY(100%);";
      default:
        return "transform: translateX(-100%);";
    }
  }
}

customElements.define("kittle-togglemenu", KittleToggleMenu);