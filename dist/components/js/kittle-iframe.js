class KittleIframe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Ambil atribut custom
    const src = this.getAttribute("src") || "";
    const pd = this.getAttribute("pd") || "10px";
    const mg = this.getAttribute("mg") || "5px";
    const rounded = this.getAttribute("rounded") || "0px";
    const bgColor = this.getAttribute("bg-color") || "rgba(30, 30, 30, 0.9)";
    const color = this.getAttribute("color") || "#ffffff";
    const blur = this.hasAttribute("blur") ? "blur(10px)" : "none";
    const mode = this.getAttribute("mode") || "default"; // default, fullscreen, popup

    // CSS Style
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        position: relative;
        margin: ${mg};
      }

      .iframe-container {
        position: relative;
        padding: ${pd};
        background: ${bgColor};
        color: ${color};
        border-radius: ${rounded};
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        transition: 0.3s;
        overflow: hidden;
      }

      iframe {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: ${rounded};
      }

      /* Mode Fullscreen */
      .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${bgColor};
        z-index: 9999;
      }

      /* Mode Popup */
      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 80%;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      }

      .popup .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 4px;
      }
    `;

    // Elemen utama iframe
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("iframe-container");

    // Elemen iframe
    this.iframe = document.createElement("iframe");
    this.iframe.src = src;

    // Jika mode fullscreen atau popup, tambahkan tombol close
    if (mode === "fullscreen" || mode === "popup") {
      this.wrapper.classList.add(mode);

      const closeButton = document.createElement("button");
      closeButton.textContent = "×";
      closeButton.classList.add("close-btn");
      closeButton.addEventListener("click", () => this.closeIframe());

      this.wrapper.appendChild(closeButton);
    }

    this.wrapper.appendChild(this.iframe);
    this.shadowRoot.append(style, this.wrapper);
  }

  closeIframe() {
    this.remove(); // Hapus elemen saat ditutup
  }
}

// Daftarkan komponen ke custom elements
customElements.define("kittle-iframe", KittleIframe);