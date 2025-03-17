class KittleTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: sans-serif;
          --padding: var(--pd, 8px);
          --margin: var(--mg, 0);
          --border-radius: var(--rounded, 4px);
          --background-color: var(--bg-color, white);
          --header-color: var(--header-color, #f1f1f1);
          --text-color: var(--color, black);
          --title-color: var(--title-color, black);
          --line-size: var(--line, 1px);
          --line-color: var(--line-color, #ddd);
          --blur: var(--blur, 0%);
          --opacity: var(--opacity, 100%);
        }

        .table-container {
          width: 100%;
          background: var(--background-color);
          padding: var(--padding);
          margin: var(--margin);
          border-radius: var(--border-radius);
          opacity: var(--opacity);
          backdrop-filter: blur(var(--blur));
          overflow: hidden;
          border: var(--line-size) solid var(--line-color);
        }

        .table-title {
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: var(--title-color);
          padding: 8px 0;
          background: var(--header-color);
          border-bottom: var(--line-size) solid var(--line-color);
        }

        .table-content {
          padding: var(--padding);
          color: var(--text-color);
        }
      </style>
      <div class="table-container">
        <div class="table-title"></div>
        <div class="table-content">
          <slot></slot>
        </div>
      </div>
    `;

    this.tableTitle = this.shadowRoot.querySelector(".table-title");
    this.applyAttributes();
  }

  connectedCallback() {
    this.applyAttributes();
  }

  applyAttributes() {
    if (this.hasAttribute("title")) {
      this.tableTitle.textContent = this.getAttribute("title");
    } else {
      this.tableTitle.style.display = "none";
    }

    const styleProps = {
      "--pd": this.getAttribute("pd"),
      "--mg": this.getAttribute("mg"),
      "--rounded": this.getAttribute("rounded") + "px",
      "--bg-color": this.getAttribute("bg-color"),
      "--header-color": this.getAttribute("header-color"),
      "--color": this.getAttribute("color"),
      "--title-color": this.getAttribute("title-color"),
      "--line": this.getAttribute("line") + "px",
      "--line-color": this.getAttribute("line-color"),
      "--blur": this.getAttribute("blur") + "%",
      "--opacity": this.getAttribute("opacity") + "%",
    };

    for (const key in styleProps) {
      if (styleProps[key]) {
        this.style.setProperty(key, styleProps[key]);
      }
    }
  }
}

customElements.define("kittle-table", KittleTable);