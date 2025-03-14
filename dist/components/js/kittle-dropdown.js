class KittleDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Ambil atribut untuk customisasi
    const padding = this.getAttribute("pd") || "10px";
    const margin = this.getAttribute("mg") || "5px";
    const position = this.getAttribute("content-position") || "left";
    const bgColor = this.getAttribute("bg-color") || "rgba(30, 30, 30, 0.9)";
    const textColor = this.getAttribute("color") || "#ffffff";
    const lineColor = this.getAttribute("line-color") || "#555";
    const title = this.getAttribute("title") || "";
    const icon = this.getAttribute("icon") || "";
    const blur = this.hasAttribute("blur") ? "blur(10px)" : "none";
    const autoClose = this.getAttribute("auto-close") === "true";
    const zIndex = this.getAttribute("index") || "9999"; // Default index
    
    // CSS Style
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        position: relative;
        margin: ${margin};
      }

      .dropdown {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: ${padding};
        background: ${bgColor};
        color: ${textColor};
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        user-select: none;
        transition: 0.3s;
      }

      .dropdown:hover {
        background: rgba(50, 50, 50, 1);
      }

      .dropdown-title {
        margin-left: 5px;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        ${position}: 0;
        background: ${bgColor};
        color: ${textColor};
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        min-width: 150px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        display: none;
        z-index: ${zIndex}; /* Tambahkan z-index */
      }

      .dropdown-menu.active {
        opacity: 1;
        transform: translateY(0);
        display: block;
      }

      .dropdown-menu::before {
        content: "";
        position: absolute;
        top: -5px;
        ${position}: 10px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid ${bgColor};
      }

      .dropdown-item {
        padding: ${padding};
        border-bottom: 1px solid ${lineColor};
        cursor: pointer;
        transition: 0.2s;
      }

      .dropdown-item:last-child {
        border-bottom: none;
      }

      .dropdown-item:hover {
        background: rgba(100, 100, 100, 0.5);
      }
    `;
    
    // Elemen utama dropdown
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("dropdown");
    
    // Elemen ikon (jika ada)
    if (icon) {
      const iconElem = document.createElement("span");
      iconElem.innerHTML = icon;
      this.wrapper.appendChild(iconElem);
    }
    
    // Elemen judul (jika ada)
    if (title) {
      const titleElem = document.createElement("span");
      titleElem.classList.add("dropdown-title");
      titleElem.textContent = title;
      this.wrapper.appendChild(titleElem);
    }
    
    // Menu dropdown
    this.menu = document.createElement("div");
    this.menu.classList.add("dropdown-menu");
    
    // Atur z-index sesuai atribut
    this.menu.style.zIndex = zIndex;
    
    // Ambil elemen dalam `<kittle-dropdown>` dan pindahkan ke menu
    while (this.firstChild) {
      let item = document.createElement("div");
      item.classList.add("dropdown-item");
      item.appendChild(this.firstChild);
      this.menu.appendChild(item);
    }
    
    this.shadowRoot.append(style, this.wrapper, this.menu);
    
    // Event Listener
    this.wrapper.addEventListener("click", () => this.toggleMenu());
    
    if (autoClose) {
      document.addEventListener("click", (event) => {
        if (!this.contains(event.target)) {
          this.menu.classList.remove("active");
        }
      });
    }
  }
  
  toggleMenu() {
    this.menu.classList.toggle("active");
  }
}

// Daftarkan komponen ke custom elements
customElements.define("kittle-dropdown", KittleDropdown);