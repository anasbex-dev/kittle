class NavbarKittle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const isDark = this.hasAttribute("bg-dark");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --background: ${isDark ? "#1E1E1E" : "#ffffff"};
          --text-color: ${isDark ? "#f5f5f5" : "#222"};
          --hover-color: ${isDark ? "#FFD700" : "#007BFF"};
          --border-color: ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"};
          --radius: 10px;
          --padding: 14px 24px;
          --transition: all 0.3s ease-in-out;
        }

        .navbar {
          background: var(--background);
          color: var(--text-color);
          padding: var(--padding);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .navbar:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .nav-logo {
          font-weight: bold;
          font-size: 1.5em;
          cursor: pointer;
        }

        .nav-menu {
          display: flex;
          gap: 20px;
        }

        .nav-menu a {
          text-decoration: none;
          color: var(--text-color);
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 6px;
          transition: var(--transition);
        }

        .nav-menu a:hover {
          color: var(--hover-color);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }

          .menu-toggle {
            display: block;
            cursor: pointer;
            font-size: 1.5em;
          }
        }
      </style>

      <div class="navbar">
        <div class="nav-logo">
          <slot name="logo">Kittle</slot>
        </div>
        <div class="nav-menu">
          <slot name="menu"></slot>
        </div>
        <div class="menu-toggle">&#9776;</div>
      </div>
    `;

    this.shadowRoot.querySelector(".menu-toggle").addEventListener("click", () => {
      const menu = this.shadowRoot.querySelector(".nav-menu");
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });
  }
}

customElements.define("navbar-kittle", NavbarKittle);