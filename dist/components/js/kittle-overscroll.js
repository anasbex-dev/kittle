class KittleOverscroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Ambil atribut
    const modeScroll = this.getAttribute("mode-scroll") || "vertical"; // vertical/horizontal
    const width = this.getAttribute("width") || "100%";
    const height = this.getAttribute("height") || "300px";
    const hideScroll = this.hasAttribute("hide-scroll");
    const reverse = this.hasAttribute("reverse"); // Jika ada, scroll akan dimulai dari akhir
    const overflow = this.getAttribute("overflow") || "auto"; // auto, scroll, hidden

    // Menentukan direction scroll berdasarkan mode-scroll
    let flexDirection = "column"; // Default: vertical (atas ke bawah)
    let scrollBehavior = "initial";
    let alignItems = "center";

    if (modeScroll === "horizontal") {
      flexDirection = "row"; // Horizontal (kiri ke kanan)
      alignItems = "flex-start";
    } else if (modeScroll === "vertical-reverse") {
      flexDirection = "column-reverse"; // Dari bawah ke atas
    } else if (modeScroll === "horizontal-reverse") {
      flexDirection = "row-reverse"; // Dari kanan ke kiri
      alignItems = "flex-start";
    }

    // Set posisi awal scroll jika reverse
    setTimeout(() => {
      if (reverse) {
        if (modeScroll.includes("horizontal")) {
          this.shadowRoot.querySelector(".scroll-container").scrollLeft = 
            this.shadowRoot.querySelector(".scroll-container").scrollWidth;
        } else {
          this.shadowRoot.querySelector(".scroll-container").scrollTop = 
            this.shadowRoot.querySelector(".scroll-container").scrollHeight;
        }
      }
    }, 10);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: ${width};
          height: ${height};
        }

        .scroll-container {
          display: flex;
          flex-direction: ${flexDirection};
          align-items: ${alignItems};
          width: 100%;
          height: 100%;
          overflow: ${overflow};
          ${hideScroll ? "scrollbar-width: none; -ms-overflow-style: none;" : ""}
        }

        /* Hide scrollbar untuk browser yang mendukung */
        ${hideScroll ? `
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
        ` : ""}
      </style>
      <div class="scroll-container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("kittle-overscroll", KittleOverscroll);