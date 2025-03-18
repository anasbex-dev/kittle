class KittleSwitchV1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Baca atribut dari elemen
    this.value = this.getAttribute("value") === "true";
    this.rounded = this.getAttribute("rounded") || "rounded"; // Default: rounded
    this.iconSrc = this.getAttribute("icon") || ""; // Default: no icon
    this.padding = this.getAttribute("pd") || "4px"; // Default: 4px
    this.margin = this.getAttribute("mg") || "5px"; // Default: 5px
    this.width = this.getAttribute("w") || "50px"; // Default: 50px
    this.height = this.getAttribute("h") || "25px"; // Default: 25px
    this.iconWidth = this.getAttribute("i-w") || "20px"; // Default: 20px
    this.iconHeight = this.getAttribute("i-h") || "20px"; // Default: 20px
    this.bgOff = this.getAttribute("bg-off") || "#ccc"; // Default: abu-abu
    this.bgActive = this.getAttribute("bg-active") || "#4CAF50"; // Default: hijau aktif
    this.lineSize = this.getAttribute("line") || "2px"; // Garis pinggir
    this.lineColor = this.getAttribute("line-color") || "transparent"; // Warna garis
    this.shadow = this.getAttribute("shadow") || "none"; // Shadow
    this.bgBlur = this.getAttribute("bg-blur") || "0"; // Blur background

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .switch-container {
          display: inline-flex;
          align-items: center;
          width: ${this.width};
          height: ${this.height};
          padding: ${this.padding};
          margin: ${this.margin};
          border-radius: ${this.getRounded()};
          background: ${this.value ? this.bgActive : this.bgOff};
          transition: background 0.3s, box-shadow 0.3s;
          position: relative;
          cursor: pointer;
          border: ${this.lineSize} solid ${this.lineColor};
          box-shadow: ${this.shadow};
          backdrop-filter: blur(${this.bgBlur});
          -webkit-backdrop-filter: blur(${this.bgBlur});
          user-select: none;
        }
        
        .switch-container:focus, .switch-container:hover {
          outline: none;
        }

        .switch-button {
          width: ${this.iconWidth};
          height: ${this.iconHeight};
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: ${this.value ? "calc(100% - " + this.iconWidth + ")" : "0"};
          transition: left 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .switch-button img {
          width: 80%;
          height: 80%;
        }
      </style>

      <div class="switch-container" tabindex="0">
        <div class="switch-button">
          ${this.iconSrc ? `<img src="${this.iconSrc}" alt="switch icon">` : ""}
        </div>
      </div>
    `;

    this.switchContainer = this.shadowRoot.querySelector(".switch-container");
    this.switchButton = this.shadowRoot.querySelector(".switch-button");

    this.switchContainer.addEventListener("click", () => this.toggleSwitch());
  }

  getRounded() {
    switch (this.rounded) {
      case "rounded-bl": return "0 0 50px 50px";
      case "rounded-br": return "0 50px 50px 0";
      case "rounded-tl": return "50px 0 0 50px";
      case "rounded-tr": return "50px 50px 0 0";
      default: return "50px"; // Default rounded
    }
  }

  toggleSwitch() {
    this.value = !this.value;
    this.switchContainer.style.background = this.value ? this.bgActive : this.bgOff;
    this.switchButton.style.left = this.value ? `calc(100% - ${this.iconWidth})` : "0";

    // Trigger event untuk bisa diakses dari luar
    this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this.value = val;
    this.switchContainer.style.background = this.value ? this.bgActive : this.bgOff;
    this.switchButton.style.left = this.value ? `calc(100% - ${this.iconWidth})` : "0";
  }
}

// Definisikan elemen baru
customElements.define("kittle-switchv1", KittleSwitchV1);