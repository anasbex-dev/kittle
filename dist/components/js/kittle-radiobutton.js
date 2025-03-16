class KittleRadioButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding: var(--pd, 10px);
          padding-top: var(--pd-t, var(--pd, 10px));
          padding-bottom: var(--pd-b, var(--pd, 10px));
          padding-left: var(--pd-l, var(--pd, 10px));
          padding-right: var(--pd-r, var(--pd, 10px));

          margin: var(--mg, 10px);
          margin-top: var(--mg-t, var(--mg, 10px));
          margin-bottom: var(--mg-b, var(--mg, 10px));
          margin-left: var(--mg-l, var(--mg, 10px));
          margin-right: var(--mg-r, var(--mg, 10px));

          font-family: var(--font-family, Arial, sans-serif);
        }

        .radio-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .radio {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid var(--color, #333);
          background: var(--bg-color, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-in-out;
        }

        .radio::after {
          content: "";
          width: 10px;
          height: 10px;
          background: transparent;
          border-radius: 50%;
          transition: background 0.3s ease-in-out;
        }

        :host([checked]) .radio {
          border-color: var(--color-active, #007bff);
        }

        :host([checked]) .radio::after {
          background: var(--color-active, #007bff);
        }

        .label {
          color: var(--color, #333);
          font-size: var(--font-size, 14px);
        }
      </style>
      
      <label class="radio-container">
        <div class="radio"></div>
        <span class="label"><slot></slot></span>
      </label>
    `;
    
    this.radioElement = this.shadowRoot.querySelector(".radio");
    this.labelElement = this.shadowRoot.querySelector(".label");
    
    this.addEventListener("click", () => this.toggleCheck());
  }
  
  static get observedAttributes() {
    return [
      "checked", "color", "color-active", "bg-color",
      "pd", "pd-t", "pd-b", "pd-l", "pd-r",
      "mg", "mg-t", "mg-b", "mg-l", "mg-r",
      "font-size", "font-family"
    ];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this.updateCheckedState();
    } else {
      this.applyCustomStyle();
    }
  }
  
  connectedCallback() {
    this.applyCustomStyle();
  }
  
  applyCustomStyle() {
    const styles = {
      "--color": this.getAttribute("color"),
      "--color-active": this.getAttribute("color-active"),
      "--bg-color": this.getAttribute("bg-color"),
      "--font-size": this.getAttribute("font-size"),
      "--font-family": this.getAttribute("font-family"),
      "--pd": this.getAttribute("pd"),
      "--pd-t": this.getAttribute("pd-t"),
      "--pd-b": this.getAttribute("pd-b"),
      "--pd-l": this.getAttribute("pd-l"),
      "--pd-r": this.getAttribute("pd-r"),
      "--mg": this.getAttribute("mg"),
      "--mg-t": this.getAttribute("mg-t"),
      "--mg-b": this.getAttribute("mg-b"),
      "--mg-l": this.getAttribute("mg-l"),
      "--mg-r": this.getAttribute("mg-r"),
    };
    
    for (const key in styles) {
      if (styles[key]) {
        this.style.setProperty(key, styles[key]);
      }
    }
  }
  
  toggleCheck() {
    const groupName = this.getAttribute("name");
    
    if (this.hasAttribute("checked")) {
      // Jika sudah aktif, uncheck
      this.removeAttribute("checked");
      this.dispatchEvent(new CustomEvent("change", { detail: null }));
    } else {
      // Jika belum aktif, aktifkan dan matikan yang lain di grup yang sama
      if (groupName) {
        document.querySelectorAll(`kittle-radiobutton[name="${groupName}"]`).forEach((el) => {
          el.removeAttribute("checked");
        });
      }
      this.setAttribute("checked", "");
      this.dispatchEvent(new CustomEvent("change", { detail: this.getAttribute("value") }));
    }
  }
  
  updateCheckedState() {
    if (this.hasAttribute("checked")) {
      this.radioElement.style.borderColor = this.getAttribute("color-active") || "#007bff";
      this.radioElement.style.backgroundColor = this.getAttribute("color-active") || "#007bff";
    } else {
      this.radioElement.style.borderColor = this.getAttribute("color") || "#333";
      this.radioElement.style.backgroundColor = this.getAttribute("bg-color") || "transparent";
    }
  }
  
  get value() {
    return this.getAttribute("value");
  }
}

customElements.define("kittle-radiobutton", KittleRadioButton);