class KittleBottomNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    const bgColor = this.getAttribute("bg-color") || "#ffffff";
    const activeColor = this.getAttribute("active-color") || "#6200ea";
    const textColor = this.getAttribute("text-color") || "#555";
    const shadow = this.hasAttribute("shadow") ? "0px -5px 15px rgba(0, 0, 0, 0.1)" : "none";
    const index = this.getAttribute("index") || "1000"; // z-index default
    const borderRadius = this.getAttribute("rounded") || "16px";
    const transitionTime = this.getAttribute("transition-time") || "0.3s";
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 600px;
          background: ${bgColor};
          box-shadow: ${shadow};
          border-radius: ${borderRadius} ${borderRadius} 0 0;
          z-index: ${index};
          overflow: hidden;
          transition: all ${transitionTime} ease-in-out;
        }

        .bottom-nav {
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          position: relative;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 10px;
          cursor: pointer;
          color: ${textColor};
          transition: all ${transitionTime} ease-in-out;
          position: relative;
        }

        .nav-item i {
          font-size: 28px;
          transition: color ${transitionTime} ease-in-out;
        }

        .nav-item span {
          font-size: 12px;
          opacity: 0.8;
          transition: color ${transitionTime} ease-in-out;
        }

        /* Gaya Android 15: Tambahkan efek pill saat aktif */
        .nav-item.active {
          color: ${activeColor} !important;
        }

        .nav-item.active i,
        .nav-item.active span {
          color: ${activeColor} !important;
        }

        .nav-item.active::before {
          content: "";
          position: absolute;
          bottom: -5px;
          width: 60%;
          height: 6px;
          background: ${activeColor};
          border-radius: 10px;
          transition: all ${transitionTime} ease-in-out;
        }

        /* Animasi Ripple Effect */
        .nav-item:active::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          animation: ripple 0.4s ease-out;
        }

        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.6;
          }
          to {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      </style>

      <div class="bottom-nav">
        <slot id="nav-slot"></slot>
      </div>
    `;
    
    this.setupNavigation();
  }
  
  setupNavigation() {
    const slot = this.shadowRoot.querySelector("#nav-slot");
    
    slot.addEventListener("slotchange", () => {
      const navItems = slot.assignedElements();
      navItems.forEach((item) => {
        item.classList.add("nav-item"); // Pastikan semua item memiliki class
        item.addEventListener("click", () => {
          navItems.forEach((nav) => nav.classList.remove("active"));
          item.classList.add("active");
        });
      });
    });
  }
}

customElements.define("kittle-bottomnavigation", KittleBottomNavigation);