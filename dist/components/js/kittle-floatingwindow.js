class KittleFloatingWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Ambil atribut untuk kustomisasi
    const padding = this.getAttribute("pd") || "20px";
    const margin = this.getAttribute("mg") || "10px";
    const position = this.getAttribute("content-position") || "center";
    const bgColor = this.getAttribute("bg-color") || "rgba(0, 0, 0, 0.7)";
    const textColor = this.getAttribute("color") || "#ffffff";
    const rounded = this.getAttribute("rounded") || "10px";
    const blur = this.hasAttribute("blur") ? "blur(10px)" : "none";
    const titleWindow = this.getAttribute("title-window") || "";
    const closeButton = this.hasAttribute("bt-close");

    // Gaya CSS
    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${bgColor};
        color: ${textColor};
        padding: ${padding};
        margin: ${margin};
        border-radius: ${rounded};
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: ${blur};
        display: flex;
        flex-direction: column;
        min-width: 200px;
        max-width: 90vw;
        max-height: 80vh;
        z-index: 1000;
        touch-action: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        padding: 10px;
        cursor: grab;
        user-select: none;
        background: rgba(255,255,255,0.1);
        border-radius: 10px 10px 0 0;
      }

      .close-btn {
        background: transparent;
        border: none;
        color: ${textColor};
        font-size: 18px;
        cursor: pointer;
      }

      .content {
        flex-grow: 1;
        overflow: auto;
        text-align: ${position};
      }
    `;

    // Elemen utama
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("floating-window");

    // Header (title + close button)
    const header = document.createElement("div");
    header.classList.add("header");

    if (titleWindow) {
      const title = document.createElement("span");
      title.textContent = titleWindow;
      header.appendChild(title);
    }

    if (closeButton) {
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "✖";
      closeBtn.classList.add("close-btn");
      closeBtn.addEventListener("click", () => this.remove());
      header.appendChild(closeBtn);
    }

    // Konten
    const content = document.createElement("div");
    content.classList.add("content");

    // Ambil semua elemen dalam <kittle-floatingwindow>
    while (this.firstChild) {
      content.appendChild(this.firstChild);
    }

    this.wrapper.append(header, content);
    this.shadowRoot.append(style, this.wrapper);

    // Tambahkan fitur drag
    this.makeDraggable(this.wrapper, header);
  }

  makeDraggable(element, handle) {
    let offsetX = 0, offsetY = 0, isDragging = false;
    let posX = window.innerWidth / 2 - element.offsetWidth / 2;
    let posY = window.innerHeight / 2 - element.offsetHeight / 2;

    const startDrag = (e) => {
      isDragging = true;
      let clientX = e.clientX || e.touches[0].clientX;
      let clientY = e.clientY || e.touches[0].clientY;
      offsetX = clientX - element.offsetLeft;
      offsetY = clientY - element.offsetTop;
      element.style.cursor = "grabbing";
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      let clientX = e.clientX || e.touches[0].clientX;
      let clientY = e.clientY || e.touches[0].clientY;
      posX = clientX - offsetX;
      posY = clientY - offsetY;

      // Batasan agar tidak keluar layar
      posX = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, posX));
      posY = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, posY));

      element.style.left = posX + "px";
      element.style.top = posY + "px";
    };

    const stopDrag = () => {
      isDragging = false;
      element.style.cursor = "grab";
    };

    // Event Listener Desktop (Mouse)
    handle.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", stopDrag);

    // Event Listener Mobile (Touch)
    handle.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("touchend", stopDrag);
  }
}

// Daftarkan komponen ke custom elements
customElements.define("kittle-floatingwindow", KittleFloatingWindow);