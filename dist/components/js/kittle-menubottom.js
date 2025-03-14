class KittleMenuBottom extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // CSS Style
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 100%;
        cursor: pointer;
        transition: 0.3s;
      }

      :host(:hover) {
        background: rgba(255, 255, 255, 0.2);
      }

      .content {
        text-align: center;
      }
    `;

    // Wrapper
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("content");

    // Slot agar isi elemen tetap bisa ditampilkan
    const slot = document.createElement("slot");
    this.wrapper.appendChild(slot);

    this.shadowRoot.append(style, this.wrapper);
  }
}

customElements.define("kittle-menubottom", KittleMenuBottom);