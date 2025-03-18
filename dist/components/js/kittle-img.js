class KittleImg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    // Ambil atribut
    const src = this.getAttribute("src") || "https://via.placeholder.com/300";
    const width = this.getAttribute("w") || "auto";
    const height = this.getAttribute("h") || "auto";
    const scale = this.getAttribute("scale") || "1"; // Default tidak ada scale
    
    // Rounded Corners
    const rounded = this.getAttribute("rounded") || "0px";
    const roundedTL = this.getAttribute("rounded-tl") || rounded;
    const roundedTR = this.getAttribute("rounded-tr") || rounded;
    const roundedBL = this.getAttribute("rounded-bl") || rounded;
    const roundedBR = this.getAttribute("rounded-br") || rounded;
    
    // Border Styles
    const lineSize = this.getAttribute("line-sz") || "3px";
    const lineColor = this.getAttribute("line-color") || "transparent";
    const lineBasic = this.hasAttribute("line-basic");
    const lineGradient = this.getAttribute("line-gradient") || "";
    
    // Hover Effect
    const hoverEffect = this.getAttribute("hover") || "scale"; // Default: Scale
    
    // Gradient Border Animation
    let gradientBorderStyle = "";
    let gradientBorderKeyframes = "";
    if (lineGradient) {
      const colors = lineGradient.split(",");
      if (colors.length === 3) {
        gradientBorderStyle = `
          border: ${lineSize} solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(45deg, ${colors[0]}, ${colors[1]}, ${colors[2]}) border-box;
          animation: gradientMove 3s linear infinite;
        `;
        
        gradientBorderKeyframes = `
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
      }
    }
    
    // Hover Effects
    let hoverStyles = "";
    switch (hoverEffect) {
      case "scale":
        hoverStyles = "transform: scale(1.1);";
        break;
      case "brightness":
        hoverStyles = "filter: brightness(1.3);";
        break;
      case "grayscale":
        hoverStyles = "filter: grayscale(1);";
        break;
      case "blur":
        hoverStyles = "filter: blur(3px);";
        break;
      default:
        hoverStyles = "transform: scale(1);";
        break;
    }
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: ${width};
          height: ${height};
          border-radius: ${roundedTL} ${roundedTR} ${roundedBR} ${roundedBL};
          overflow: hidden;
          ${lineBasic ? `border: ${lineSize} solid ${lineColor};` : ""}
          ${gradientBorderStyle}
          transition: all 0.3s ease-in-out;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
          transition: all 0.3s ease-in-out;
          transform: scale(${scale});
        }

        img:hover {
          ${hoverStyles}
        }

        ${gradientBorderKeyframes}
      </style>
      <img src="${src}" />
    `;
  }
}

customElements.define("kittle-img", KittleImg);