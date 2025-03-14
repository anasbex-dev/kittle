class NavbarKittle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    const isDark = this.hasAttribute("bg-dark");
    const isBlur = this.hasAttribute("bg-blur");
    const isRounded = this.hasAttribute("rounded");
    const isShadow = this.hasAttribute("shadow");
    const customBgColor = this.getAttribute("bg-color");
    const customTextColor = this.getAttribute("text-color");
    const spacing = this.getAttribute("spacing") || "20px";
    const logoImg = this.getAttribute("logo-img");
    const logoSize = this.getAttribute("logo-size") || "40px";
  
    let bgColor = customBgColor ? customBgColor : isDark ? "var(--kittle-dark-bg)" : "var(--kittle-light-bg)";
    let textColor = customTextColor ? customTextColor : (isDark || customBgColor ? "var(--kittle-dark-text)" : "var(--kittle-light-text)");
  
    const blurEffect = isBlur ? "backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);" : "";
    const borderRadius = isRounded ? "12px" : "0px";
    const boxShadow = isShadow ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none";
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --background: ${bgColor};
          --text-color: ${textColor};
          --radius: ${borderRadius};
          --padding: 12px 20px;
          --spacing: ${spacing};
        }

        .navbar {
          background: var(--background);
          color: var(--text-color);
          padding: var(--padding);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: var(--radius);
          box-shadow: ${boxShadow};
          ${blurEffect} /* Efek blur jika atribut bg-blur ada */
        }

        .nav-logo {
          font-weight: bold;
          font-size: 1.5em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-logo img {
          width: ${logoSize};
          height: ${logoSize};
          object-fit: contain;
        }

        .nav-menu {
          display: flex;
          gap: var(--spacing);
        }

        ::slotted(.nav-link) {
          text-decoration: none;
          color: var(--text-color);
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        ::slotted(.nav-link:hover) {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="navbar">
        <div class="nav-logo">
          ${logoImg ? `<img src="${logoImg}" alt="Logo">` : `<slot name="logo"></slot>`}
        </div>
        <div class="nav-menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("navbar-kittle", NavbarKittle);