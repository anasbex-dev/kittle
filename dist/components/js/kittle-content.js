class KittleContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const positionContent = this.getAttribute("position-content") || "center";
    const padding = this.getAttribute("pd") || "20px";
    const margin = this.getAttribute("mg") || "auto";
    const rounded = this.getAttribute("rounded") || "10px";
    const bgColor = this.getAttribute("bg-color") || "rgba(0, 0, 0, 0.5)";
    const textColor = this.getAttribute("color") || "#ffffff";

    // Gaya dasar untuk content
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: ${positionContent};
        align-items: center;
        width: 100%;
        height: 100%;
        max-width: 100vw;
        flex-grow: 1;
        padding: ${padding};
        margin: ${margin};
        border-radius: ${rounded};
        background: ${bgColor};
        color: ${textColor};
        box-sizing: border-box;
        overflow: auto;
      }
    `;

    // Elemen wrapper
    const wrapper = document.createElement("div");
    wrapper.setAttribute("part", "wrapper");
    wrapper.style.width = "100%";
    wrapper.style.height = "100vh";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";

    // Ambil semua elemen dalam <kittle-content>
    while (this.firstChild) {
      wrapper.appendChild(this.firstChild);
    }

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define("kittle-content", KittleContent);