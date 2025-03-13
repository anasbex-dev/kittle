class KittleNestedScroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.scrollFactor = 1;
    this.autoScroll = false;
    this.scrollInterval = 2000;
    this.syncId = null;
    this.enableDrag = false;
    this.enableInfinite = false;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          overflow: auto;
          position: relative;
          max-height: 300px;
          border: 1px solid #ddd;
          scroll-behavior: smooth;
        }

        progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          border: none;
          appearance: none;
        }

        progress::-webkit-progress-bar {
          background: #f3f3f3;
        }

        progress::-webkit-progress-value {
          background: #00aaff;
        }
      </style>
      <slot></slot>
      <progress max="100" value="0"></progress>
    `;

    this.container = this;
    this.progressBar = this.shadowRoot.querySelector("progress");

    this.applyAttributes();
    this.initScrollFeatures();
  }

  applyAttributes() {
    this.scrollFactor = parseFloat(this.getAttribute("scroll-factor")) || 1;
    this.autoScroll = this.getAttribute("auto-scroll") === "true";
    this.scrollInterval = parseInt(this.getAttribute("scroll-interval")) || 2000;
    this.syncId = this.getAttribute("sync-id");
    this.enableDrag = this.getAttribute("drag-scroll") === "true";
    this.enableInfinite = this.getAttribute("infinite-scroll") === "true";
  }

  initScrollFeatures() {
    if (this.container) {
      // Custom Scroll Speed
      this.container.addEventListener("wheel", (e) => {
        e.preventDefault();
        this.container.scrollTop += e.deltaY * this.scrollFactor;
      });

      // Scroll Indicator
      this.container.addEventListener("scroll", () => {
        let maxScroll = this.container.scrollHeight - this.container.clientHeight;
        if (maxScroll > 0) {
          let percent = (this.container.scrollTop / maxScroll) * 100;
          this.progressBar.value = percent;
        }

        // Infinite Scroll
        if (this.enableInfinite && this.container.scrollTop + this.container.clientHeight >= this.container.scrollHeight) {
          this.container.scrollTop = 0;
        }

        // Sync Scroll
        if (this.syncId) {
          document.querySelectorAll(`nestedscroll[sync-id="${this.syncId}"]`).forEach(el => {
            if (el !== this.container) el.scrollTop = this.container.scrollTop;
          });
        }
      });

      // Auto-Scroll
      if (this.autoScroll) {
        setInterval(() => {
          if (this.container.scrollTop + this.container.clientHeight < this.container.scrollHeight) {
            this.container.scrollTop += 10;
          } else if (this.enableInfinite) {
            this.container.scrollTop = 0;
          }
        }, this.scrollInterval);
      }

      // Drag-to-Scroll
      if (this.enableDrag) {
        let isDown = false, startY, scrollTop;
        this.container.addEventListener("mousedown", (e) => {
          isDown = true;
          startY = e.pageY - this.container.offsetTop;
          scrollTop = this.container.scrollTop;
        });

        this.container.addEventListener("mousemove", (e) => {
          if (!isDown) return;
          e.preventDefault();
          const y = e.pageY - this.container.offsetTop;
          this.container.scrollTop = scrollTop - (y - startY);
        });

        this.container.addEventListener("mouseup", () => isDown = false);
        this.container.addEventListener("mouseleave", () => isDown = false);
      }
    }
  }

  connectedCallback() {
    this.applyAttributes();
    this.initScrollFeatures();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.applyAttributes();
    this.initScrollFeatures();
  }

  static get observedAttributes() {
    return ["scroll-factor", "auto-scroll", "scroll-interval", "sync-id", "drag-scroll", "infinite-scroll"];
  }
}

if (!customElements.get("kittle-nestedscroll")) {
  customElements.define("kittle-nestedscroll", KittleNestedScroll);
}