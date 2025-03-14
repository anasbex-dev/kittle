class KittleBottomNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Ambil atribut custom
    const pd = this.getAttribute("pd") || "10px";
    const mg = this.getAttribute("mg") || "5px";
    const bgColor = this.getAttribute("bg-color") || "rgba(30, 30, 30, 0.9)";
    const color = this.getAttribute("color") || "#ffffff";
    const rounded = this.getAttribute("rounded") || "15px";
    const blur = this.hasAttribute("blur") ? "blur(10px)" : "none";
    
    // Atribut toggle
    const toggleText = this.getAttribute("toggle-text") || "☰ Menu";
    const toggleBg = this.getAttribute("toggle-bg") || "rgba(255, 255, 255, 0.1)";
    const toggleColor = this.getAttribute("toggle-color") || "#ffffff";
    const toggleRadius = this.getAttribute("toggle-radius") || "10px";

    // Atribut layout (row, column, grid)
    const layout = this.getAttribute("layout") || "row";

    // CSS Style
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: ${mg};
        z-index: 1000;
      }

      .bottom-nav {
        position: relative;
        background: ${bgColor};
        color: ${color};
        padding: ${pd};
        border-radius: ${rounded} ${rounded} 0 0;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        text-align: center;
        overflow: hidden;
      }

      .bottom-toggle {
        text-align: center;
        padding: 10px;
        cursor: pointer;
        background: ${toggleBg};
        color: ${toggleColor};
        border-radius: ${toggleRadius};
        transition: 0.3s;
      }

      .bottom-toggle:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .bottom-menu {
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        background: ${bgColor};
        border-radius: ${rounded} ${rounded} 0 0;
        box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        overflow: hidden;
        display: none;  /* 🔥 Benar-benar disembunyikan */
        flex-direction: ${layout === "column" ? "column" : "row"};
        flex-wrap: ${layout === "grid" ? "wrap" : "nowrap"};
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .bottom-menu.active {
        display: flex;
        opacity: 1;
        transform: translateY(0);
      }
    `;

    // Elemen utama bottom navigation
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("bottom-nav");

    // Tombol toggle
    this.toggleButton = document.createElement("div");
    this.toggleButton.classList.add("bottom-toggle");
    this.toggleButton.textContent = toggleText;

    // Menu bottom
    this.menu = document.createElement("div");
    this.menu.classList.add("bottom-menu");

    // Slot untuk menampung `kittle-menubottom`
    const slot = document.createElement("slot");

    this.menu.appendChild(slot);
    this.wrapper.append(this.toggleButton, this.menu);
    this.shadowRoot.append(style, this.wrapper);

    // Event toggle menu
    this.toggleButton.addEventListener("click", (event) => {
      if (this.menu.classList.contains("active")) {
        this.menu.classList.remove("active");
        setTimeout(() => {
          this.menu.style.display = "none"; // 🔥 Setelah animasi selesai, benar-benar disembunyikan
        }, 300);
      } else {
        this.menu.style.display = "flex";
        setTimeout(() => {
          this.menu.classList.add("active");
        }, 10);
      }
      event.stopPropagation(); // Mencegah klik ini dianggap klik di luar
    });

    // Klik di luar menu akan menutup menu
    document.addEventListener("click", (event) => {
      if (!this.contains(event.target)) {
        this.menu.classList.remove("active");
        setTimeout(() => {
          this.menu.style.display = "none";
        }, 300);
      }
    });
  }
}

customElements.define("kittle-bottomnavigation", KittleBottomNavigation);