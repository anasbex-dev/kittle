class KittleDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  connectedCallback() {
    // Ambil atribut yang bisa dikustomisasi
    const position = this.getAttribute("position") || "bottom"; // default bawah
    const trigger = this.getAttribute("trigger") || "click"; // click atau hover
    const width = this.getAttribute("width") || "200px";
    const background = this.getAttribute("background") || "rgba(255, 255, 255, 0.2)";
    const textColor = this.getAttribute("text-color") || "#333";
    const borderRadius = this.getAttribute("border-radius") || "10px";
    const shadow = this.getAttribute("shadow") || "0 5px 15px rgba(0, 0, 0, 0.2)";
    const animation = this.getAttribute("animation") || "fade"; // fade, slide, scale
    const blur = this.hasAttribute("blur") ? "backdrop-filter: blur(10px);" : "";
    const zIndex = this.getAttribute("z-index") || "999";
    
    // Soft blur effect dan styling default Kittle
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }

        .dropdown-button {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 15px;
          background: ${background};
          color: ${textColor};
          border-radius: ${borderRadius};
          box-shadow: ${shadow};
          transition: 0.3s ease-in-out;
        }

        .dropdown-menu {
          position: absolute;
          min-width: ${width};
          background: ${background};
          color: ${textColor};
          border-radius: ${borderRadius};
          box-shadow: ${shadow};
          padding: 10px;
          display: none;
          z-index: ${zIndex};
          ${blur}
          ${this.getPositionStyles(position)}
          ${this.getAnimationStyles(animation, false)}
        }

        .dropdown-menu.show {
          display: block;
          ${this.getAnimationStyles(animation, true)}
        }

        slot {
          display: block;
        }
      </style>

      <div class="dropdown-button">
        <slot name="button"></slot>
      </div>
      <div class="dropdown-menu">
        <slot name="menu"></slot>
      </div>
    `;

    this.dropdownButton = this.shadowRoot.querySelector(".dropdown-button");
    this.dropdownMenu = this.shadowRoot.querySelector(".dropdown-menu");

    // Event Listener berdasarkan atribut trigger
    if (trigger === "click") {
      this.dropdownButton.addEventListener("click", () => this.toggleDropdown());
      document.addEventListener("click", (event) => {
        if (!this.contains(event.target)) this.closeDropdown();
      });
    } else if (trigger === "hover") {
      this.dropdownButton.addEventListener("mouseenter", () => this.openDropdown());
      this.dropdownButton.addEventListener("mouseleave", () => this.closeDropdown());
      this.dropdownMenu.addEventListener("mouseenter", () => this.openDropdown());
      this.dropdownMenu.addEventListener("mouseleave", () => this.closeDropdown());
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.updateDropdownState();
  }

  openDropdown() {
    this.isOpen = true;
    this.updateDropdownState();
  }

  closeDropdown() {
    this.isOpen = false;
    this.updateDropdownState();
  }

  updateDropdownState() {
    if (this.isOpen) {
      this.dropdownMenu.classList.add("show");
    } else {
      this.dropdownMenu.classList.remove("show");
    }
  }

  getPositionStyles(position) {
    switch (position) {
      case "top":
        return "bottom: 100%; left: 50%; transform: translateX(-50%);";
      case "left":
        return "right: 100%; top: 50%; transform: translateY(-50%);";
      case "right":
        return "left: 100%; top: 50%; transform: translateY(-50%);";
      default:
        return "top: 100%; left: 50%; transform: translateX(-50%);"; // default bottom
    }
  }

  getAnimationStyles(animation, isActive) {
    switch (animation) {
      case "fade":
        return isActive ? "opacity: 1; transition: opacity 0.3s ease-in-out;" : "opacity: 0;";
      case "slide":
        return isActive
          ? "opacity: 1; transform: translateY(0); transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;"
          : "opacity: 0; transform: translateY(-10px);";
      case "scale":
        return isActive
          ? "opacity: 1; transform: scale(1); transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;"
          : "opacity: 0; transform: scale(0.95);";
      default:
        return "";
    }
  }
}

customElements.define("kittle-dropdown", KittleDropdown);