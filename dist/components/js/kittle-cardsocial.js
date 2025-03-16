class KittleCardSocial extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: var(--w, 260px);
          height: var(--h, auto);
          padding: var(--pd, 15px);
          padding-top: var(--pd-t, var(--pd, 15px));
          padding-bottom: var(--pd-b, var(--pd, 15px));
          padding-left: var(--pd-l, var(--pd, 15px));
          padding-right: var(--pd-r, var(--pd, 15px));

          margin: var(--mg, 15px);
          margin-top: var(--mg-t, var(--mg, 15px));
          margin-bottom: var(--mg-b, var(--mg, 15px));
          margin-left: var(--mg-l, var(--mg, 15px));
          margin-right: var(--mg-r, var(--mg, 15px));

          background: var(--bg-color, #f8f9fa);
          color: var(--color, #333);
          border-radius: var(--rounded, 12px);
          box-shadow: var(--shadow, 0 4px 10px rgba(0, 0, 0, 0.1));
          overflow: hidden;
          text-align: var(--content-position, center);
          position: relative;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          font-family: var(--font-family, Arial, sans-serif);
        }

        :host([blur]) {
          backdrop-filter: blur(5px);
          background: rgba(255, 255, 255, 0.6);
        }

        .content {
          padding: 20px;
        }

        .line {
          width: 100%;
          height: 3px;
          background: var(--line-color, #007bff);
          position: absolute;
          bottom: 0;
          left: 0;
        }

        /* Hover Effects */
        :host([hover="fade"]:hover) { opacity: 0.7; }
        :host([hover="scale"]:hover) { transform: scale(1.1); }
        :host([hover="rotate"]:hover) { transform: rotate(5deg); }
        :host([hover="shadow"]:hover) { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); }
        :host([hover="blur"]:hover) { filter: blur(2px); }

        /* Default Kittle Theme */
        :host([theme="default"]) {
          --bg-color: #ffffff;
          --color: #000000;
          --shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          --rounded: 10px;
          --content-position: center;
          --font-family: "Roboto", sans-serif;
          --line-color: #007bff;
        }

      </style>
      <a id="card-link">
        <div class="content">
          <slot></slot>
        </div>
        <div class="line"></div>
      </a>
    `;

    this.card = this.shadowRoot.getElementById("card-link");
  }

  connectedCallback() {
    this.applyCustomStyle();

    // Atur href jika ada atributnya
    if (this.hasAttribute("href")) {
      this.card.href = this.getAttribute("href");
      this.card.target = "#";
    }
  }

  static get observedAttributes() {
    return [
      "w", "h",
      "mg", "mg-t", "mg-b", "mg-l", "mg-r",
      "pd", "pd-t", "pd-b", "pd-l", "pd-r",
      "bg-color", "color", "rounded", "shadow",
      "content-position", "line-color", "blur",
      "hover", "href", "theme", "font-family"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "href") {
      this.card.href = newValue;
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
      "--rounded": this.getAttribute("rounded"),
      "--shadow": this.getAttribute("shadow"),
      "--content-position": this.getAttribute("content-position"),
      "--line-color": this.getAttribute("line-color"),
      "--font-family": this.getAttribute("font-family"),
    };

    for (const key in styles) {
      if (styles[key]) {
        this.style.setProperty(key, styles[key]);
      }
    }
  }
}

customElements.define("kittle-cardsocial", KittleCardSocial);