class KittleTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: var(--w, 100%);
          height: var(--h, auto);
        }

        textarea {
          width: 100%;
          height: 100%;
          min-height: 100px;
          padding: var(--pd, 10px);
          padding-top: var(--pd-t, var(--pd, 10px));
          padding-bottom: var(--pd-b, var(--pd, 10px));
          padding-left: var(--pd-l, var(--pd, 10px));
          padding-right: var(--pd-r, var(--pd, 10px));

          margin: var(--mg, 5px);
          margin-top: var(--mg-t, var(--mg, 5px));
          margin-bottom: var(--mg-b, var(--mg, 5px));
          margin-left: var(--mg-l, var(--mg, 5px));
          margin-right: var(--mg-r, var(--mg, 5px));

          background: var(--bg-color, white);
          color: var(--color, black);
          font-size: var(--font-sz, 16px);
          font-family: var(--font-family, sans-serif);
          text-align: var(--content-position, left);
          border-radius: var(--rounded, 5px);
          box-shadow: var(--shadow, none);
          border: 1px solid var(--border-color, #ccc);
          outline: none;
          resize: vertical;
          transition: all 0.3s ease;
        }

        textarea:focus {
          border-color: var(--focus-border, #666);
        }

        :host([blur]) textarea {
          backdrop-filter: blur(5px);
          background: rgba(255, 255, 255, 0.5);
        }
      </style>
      <textarea></textarea>
    `;
    
    this.textarea = this.shadowRoot.querySelector("textarea");
  }
  
  connectedCallback() {
    this.applyCustomStyle();
    
    if (this.hasAttribute("value")) {
      this.textarea.value = this.getAttribute("value");
    }
  }
  
  static get observedAttributes() {
    return [
      "w", "h",
      "mg", "mg-t", "mg-b", "mg-l", "mg-r",
      "pd", "pd-t", "pd-b", "pd-l", "pd-r",
      "bg-color", "color", "font-sz", "font-family",
      "content-position", "rounded", "shadow", "blur",
      "value"
    ];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      this.textarea.value = newValue;
    } else {
      this.applyCustomStyle();
    }
  }
  
  applyCustomStyle() {
    const styles = {
      "--w": this.getAttribute("w"),
      "--h": this.getAttribute("h"),
      "--mg": this.getAttribute("mg"),
      "--mg-t": this.getAttribute("mg-t"),
      "--mg-b": this.getAttribute("mg-b"),
      "--mg-l": this.getAttribute("mg-l"),
      "--mg-r": this.getAttribute("mg-r"),
      "--pd": this.getAttribute("pd"),
      "--pd-t": this.getAttribute("pd-t"),
      "--pd-b": this.getAttribute("pd-b"),
      "--pd-l": this.getAttribute("pd-l"),
      "--pd-r": this.getAttribute("pd-r"),
      "--bg-color": this.getAttribute("bg-color"),
      "--color": this.getAttribute("color"),
      "--font-sz": this.getAttribute("font-sz"),
      "--font-family": this.getAttribute("font-family"),
      "--content-position": this.getAttribute("content-position"),
      "--rounded": this.getAttribute("rounded"),
      "--shadow": this.getAttribute("shadow"),
    };
    
    for (const key in styles) {
      if (styles[key]) {
        this.style.setProperty(key, styles[key]);
      }
    }
  }
  
  getValue() {
    return this.textarea.value;
  }
  
  setValue(val) {
    this.textarea.value = val;
    this.setAttribute("value", val);
  }
}

customElements.define("kittle-textarea", KittleTextarea);