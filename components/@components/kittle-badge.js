class KittleBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const bgColor = this.getAttribute("bg-color") || "#ff4757";
    const textColor = this.getAttribute("text-color") || "#ffffff";
    const borderColor = this.getAttribute("border-color") || bgColor;
    const borderRadius = this.getAttribute("rounded") || "16px";
    const padding = this.getAttribute("padding") || "6px 12px";
    const fontSize = this.getAttribute("font-size") || "12px";
    const shadow = this.hasAttribute("shadow") ? "0px 4px 10px rgba(0, 0, 0, 0.15)" : "none";
    const badgeType = this.getAttribute("badge-type") || "default"; // default, dot, outlined, pill, icon
    const icon = this.getAttribute("icon") || ""; // Icon jika ada

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: ${bgColor};
          color: ${textColor};
          border-radius: ${borderRadius};
          padding: ${padding};
          font-size: ${fontSize};
          box-shadow: ${shadow};
          border: 1px solid ${borderColor};
          transition: all 0.3s ease-in-out;
          font-weight: bold;
          position: relative;
          cursor: default;
        }

        /* Style Variasi */
        ${badgeType === "dot" ? `
        .badge {
          width: 12px;
          height: 12px;
          padding: 0;
          border-radius: 50%;
          border: none;
          background: ${bgColor};
          position: absolute;
          top: -4px;
          right: -4px;
        }
        ` : ""}
        
        ${badgeType === "outlined" ? `
        .badge {
          background: transparent;
          color: ${bgColor};
          border: 2px solid ${bgColor};
        }
        ` : ""}

        ${badgeType === "pill" ? `
        .badge {
          border-radius: 50px;
          padding: 4px 16px;
        }
        ` : ""}

        ${badgeType === "icon" && icon ? `
        .badge {
          padding: 6px;
          width: 24px;
          height: 24px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        .badge i {
          font-size: ${fontSize};
          color: ${textColor};
        }
        ` : ""}
      </style>
      
      <div class="badge">
        ${icon ? `<i class="material-icons">${icon}</i>` : `<slot></slot>`}
      </div>
    `;
  }
}

customElements.define("kittle-badge", KittleBadge);