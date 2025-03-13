class KittleSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Nilai default
    this.checked = this.hasAttribute("checked");
    this.color = this.getAttribute("color") || "#007AFF"; // Warna saat ON
    this.size = this.getAttribute("size") || "medium";
    this.rounded = this.hasAttribute("rounded");
    this.disabled = this.hasAttribute("disabled");
    
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Container utama */
        .switch-container {
          position: relative;
          width: var(--switch-width, 50px);
          height: var(--switch-height, 26px);
          background: ${this.checked ? this.color : "#ccc"}; /* Dinamis */
          border-radius: ${this.rounded ? "50px" : "13px"};
          cursor: ${this.disabled ? "not-allowed" : "pointer"};
          transition: background 0.3s;
          ${this.hasAttribute("blur") ? "backdrop-filter: blur(8px);" : ""}
        }

        /* Tombol switch */
        .switch-btn {
          position: absolute;
          top: 3px;
          left: 3px;
          width: var(--btn-size, 20px);
          height: var(--btn-size, 20px);
          background: white;
          border-radius: 50%;
          transition: transform 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Mode aktif */
        .switch-container.active {
          background: ${this.color}; /* Warna saat ON */
        }
        .switch-container.active .switch-btn {
          transform: translateX(24px);
        }

        /* Mode disabled */
        .switch-container.disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Ukuran switch */
        :host([size="small"]) .switch-container {
          --switch-width: 40px;
          --switch-height: 20px;
          --btn-size: 16px;
        }
        :host([size="large"]) .switch-container {
          --switch-width: 60px;
          --switch-height: 32px;
          --btn-size: 28px;
        }
      </style>

      <div class="switch-container ${this.checked ? "active" : ""} ${this.disabled ? "disabled" : ""}">
        <div class="switch-btn"></div>
      </div>
    `;
    
    this.switchElement = this.shadowRoot.querySelector(".switch-container");
    
    // Event click untuk mengubah state
    if (!this.disabled) {
      this.switchElement.addEventListener("click", () => this.toggleSwitch());
    }
  }
  
  toggleSwitch() {
    this.checked = !this.checked;
    this.switchElement.classList.toggle("active", this.checked);
    
    // Update warna ON/OFF
    this.switchElement.style.background = this.checked ? this.color : "#ccc";
    
    this.dispatchEvent(new CustomEvent("change", { detail: this.checked }));
  }
  
  static get observedAttributes() {
    return ["checked", "color", "disabled"];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.checked = this.hasAttribute("checked");
      this.switchElement.classList.toggle("active", this.checked);
      this.switchElement.style.background = this.checked ? this.color : "#ccc";
    }
    if (name === "color") {
      this.color = newValue || "#007AFF";
      this.switchElement.style.background = this.checked ? this.color : "#ccc";
    }
    if (name === "disabled") {
      this.disabled = this.hasAttribute("disabled");
      this.switchElement.classList.toggle("disabled", this.disabled);
    }
  }
}

// Definisikan komponen
customElements.define("kittle-switch", KittleSwitch);