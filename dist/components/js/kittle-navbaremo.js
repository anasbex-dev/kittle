class KittleNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Default attributes
    this.logo = this.getAttribute("logo") || "";
    this.toggleIcon = this.getAttribute("toggle-icon") || "☰";
    this.logoText = this.getAttribute("logo-text") || "Your Name";
    this.responsive = this.getAttribute("responsive") !== "false";
    this.menuType = this.getAttribute("menu-type") || "default";
    this.bgColor = this.getAttribute("bg-color") || "rgba(30, 30, 30, 0.9)";
    this.color = this.getAttribute("color") || "#fff";
    this.index = this.getAttribute("index") || "1000";
    this.rounded = this.getAttribute("rounded") === "true";
    
    this.render();
  }
  
  render() {
    const menuItems = this.innerHTML.trim();
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: sans-serif;
          z-index: ${this.index};
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: ${this.bgColor};
          padding: 10px 20px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          color: ${this.color};
          ${this.rounded ? "border-radius: 10px;" : ""}
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
        }

        .logo img {
          max-height: 40px;
          margin-right: 10px;
        }

        .menu {
          display: flex;
          gap: 15px;
        }

        .menu a {
          color: ${this.color};
          text-decoration: none;
          font-size: 16px;
          transition: 0.3s;
        }

        .menu a:hover {
          opacity: 0.7;
        }

        .toggle-btn {
          display: none;
          font-size: 24px;
          cursor: pointer;
          background: none;
          border: none;
          color: ${this.color};
        }

        /* Drawer menu */
        .drawer-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: none;
          justify-content: flex-start;
          align-items: center;
          z-index: ${this.index};
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        .drawer {
          width: 250px;
          height: 100vh;
          background: ${this.bgColor};
          box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          padding: 15px;
          color: ${this.color};
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
          opacity: 0;
        }

        .drawer-container.open {
          display: flex;
          opacity: 1;
        }

        .drawer.open {
          transform: translateX(0);
          opacity: 1;
        }

        /* Responsive Style */
        @media (max-width: 768px) {
          .toggle-btn {
            display: block;
          }
          
          .menu {
            display: none;
          }

          .menu.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background: ${this.bgColor};
            padding: 10px 0;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
          }
        }

        /* Jika mode responsive dimatikan, paksa tampilan mobile */
        :host([responsive="false"]) .menu {
          display: none !important;
        }
        :host([responsive="false"]) .toggle-btn {
          display: block !important;
        }
      </style>

      <nav class="navbar">
        <div class="logo">
          ${this.logo ? `<img src="${this.logo}" alt="Logo">` : ""}
          <span>${this.logoText}</span>
        </div>
        <button class="toggle-btn">${this.getToggleIconHTML()}</button>
        <div class="menu">${menuItems}</div>
      </nav>

      ${this.menuType === "drawer" ? `
        <div class="drawer-container">
          <div class="drawer">${menuItems}</div>
        </div>
      ` : ""}
    `;
    
    this.setupListeners();
  }
  
  setupListeners() {
    const toggleBtn = this.shadowRoot.querySelector(".toggle-btn");
    const drawerContainer = this.shadowRoot.querySelector(".drawer-container");
    const drawer = this.shadowRoot.querySelector(".drawer");
    
    if (toggleBtn && drawerContainer && drawer) {
      toggleBtn.addEventListener("click", () => {
        drawerContainer.classList.add("open");
        setTimeout(() => {
          drawer.classList.add("open");
        }, 10); // Delay agar opacity dan transform berjalan bersamaan
        document.body.style.overflow = "hidden"; // Cegah scroll di belakang
      });
      
      drawerContainer.addEventListener("click", (e) => {
        if (e.target === drawerContainer) {
          drawer.classList.remove("open");
          setTimeout(() => {
            drawerContainer.classList.remove("open");
          }, 300); // Delay agar animasi keluar lebih halus
          document.body.style.overflow = ""; // Aktifkan kembali scroll
        }
      });
    }
  }
  
  getToggleIconHTML() {
    return this.toggleIcon.startsWith("http") ? `<img src="${this.toggleIcon}" alt="Toggle" width="24">` : this.toggleIcon;
  }
  
  static get observedAttributes() {
    return ["logo", "toggle-icon", "responsive", "menu-type", "bg-color", "color", "index", "rounded"];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    this[name.replace("-", "")] = newValue;
    this.render();
  }
}

customElements.define("kittle-navbaremo", KittleNavbar);