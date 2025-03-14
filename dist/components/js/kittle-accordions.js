class KittleAccordions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: sans-serif;
          --text-color: var(--color, #000);
          --padding: var(--pd, 0);
          --padding-top: var(--pd-t, var(--padding));
          --padding-bottom: var(--pd-b, var(--padding));
          --padding-left: var(--pd-l, var(--padding));
          --padding-right: var(--pd-r, var(--padding));
          --margin: var(--mg, 0);
          --margin-top: var(--mg-t, var(--margin));
          --margin-bottom: var(--mg-b, var(--margin));
          --margin-left: var(--mg-l, var(--margin));
          --margin-right: var(--mg-r, var(--margin));
        }

        .accordion {
          border-radius: var(--border-radius, 8px);
          overflow: hidden;
          border: 1px solid var(--border-color, #ddd);
          background: var(--bg-color, white);
          box-shadow: var(--shadow, none);
          transition: all 0.3s ease;
          color: var(--text-color);
          padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
          margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left);
        }

        .accordion[blur] {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .accordion-header {
          padding: 12px;
          background: var(--header-bg, #f1f1f1);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          transition: background 0.3s;
          color: var(--text-color);
        }

        .accordion-header:hover {
          background: var(--header-hover-bg, #e1e1e1);
        }

        .accordion-body {
          padding: 0 12px;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
          opacity: 0;
          color: var(--text-color);
        }

        .accordion.open .accordion-body {
          max-height: 200px;
          opacity: 1;
          padding-bottom: 12px;
        }

        .icon {
          transition: transform 0.3s;
          color: var(--text-color);
        }

        .open .icon {
          transform: rotate(180deg);
        }
      </style>
      <div class="accordion">
        <div class="accordion-header">
          <span class="title"></span>
          <span class="icon">▼</span>
        </div>
        <div class="accordion-body">
          <slot></slot>
        </div>
      </div>
    `;
    
    this.accordion = this.shadowRoot.querySelector(".accordion");
    this.header = this.shadowRoot.querySelector(".accordion-header");
    this.body = this.shadowRoot.querySelector(".accordion-body");
    this.icon = this.shadowRoot.querySelector(".icon");
    
    this.header.addEventListener("click", (event) => {
      this.toggleAccordion();
      event.stopPropagation(); // Mencegah event klik menyebar
    });
    
    document.addEventListener("click", (event) => this.closeIfClickedOutside(event));
  }
  
  connectedCallback() {
    if (this.hasAttribute("title")) {
      this.shadowRoot.querySelector(".title").textContent = this.getAttribute("title");
    }
    if (this.hasAttribute("blur")) {
      this.accordion.setAttribute("blur", "");
    }
    this.applyCustomStyle();
  }
  
  toggleAccordion() {
    const isOpen = this.accordion.classList.contains("open");
    
    if (!this.hasAttribute("no-auto-close")) {
      document.querySelectorAll("kittle-accordions").forEach((el) => {
        if (el !== this) el.closeAccordion();
      });
    }
    
    if (isOpen) {
      this.closeAccordion();
    } else {
      this.openAccordion();
    }
  }
  
  openAccordion() {
    this.accordion.classList.add("open");
    this.body.style.maxHeight = this.body.scrollHeight + "px";
  }
  
  closeAccordion() {
    this.accordion.classList.remove("open");
    this.body.style.maxHeight = "0";
  }
  
  closeIfClickedOutside(event) {
    if (!this.contains(event.target)) {
      this.closeAccordion();
    }
  }
  
  applyCustomStyle() {
    const styleProps = {
      "--bg-color": this.getAttribute("bg-color"),
      "--border-color": this.getAttribute("border-color"),
      "--header-bg": this.getAttribute("header-bg"),
      "--header-hover-bg": this.getAttribute("header-hover-bg"),
      "--border-radius": this.getAttribute("rounded") + "px",
      "--shadow": this.getAttribute("shadow") ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
      "--color": this.getAttribute("color"), // Warna teks
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
    
    for (const key in styleProps) {
      if (styleProps[key]) {
        this.style.setProperty(key, styleProps[key]);
      }
    }
  }
}

customElements.define("kittle-accordions", KittleAccordions);