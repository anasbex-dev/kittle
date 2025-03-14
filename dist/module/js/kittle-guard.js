class KittleGuard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          user-select: none; /* Blokir seleksi teks */
          pointer-events: none; /* Blokir semua event klik */
        }

        ::slotted(*) {
          pointer-events: auto; /* Izinkan interaksi kecuali long press & seleksi teks */
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none; /* Blokir seleksi teks pada semua elemen */
        }
      </style>
      <slot></slot>
    `;

    this.setupEventBlockers();
  }

  setupEventBlockers() {
    this.addEventListener("contextmenu", (e) => e.preventDefault()); // Blokir klik kanan
    this.addEventListener("copy", (e) => e.preventDefault()); // Blokir copy teks
    this.addEventListener("cut", (e) => e.preventDefault()); // Blokir cut teks
    this.addEventListener("paste", (e) => e.preventDefault()); // Blokir paste
    this.addEventListener("mousedown", (e) => e.preventDefault(), true); // Blokir klik panjang
    //this.addEventListener("touchstart", (e) => e.preventDefault(), true); // Blokir long-press di mobile
  }
}

customElements.define("kittle-guard", KittleGuard);