class Kittle2DCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Canvas & Context
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Attributes
    this.width = this.getAttribute("width") || "600";
    this.height = this.getAttribute("height") || "400";
    this.bgColor = this.getAttribute("background") || "transparent";
    this.optimize = this.hasAttribute("optimize"); // Optimasi performa

    // Append Canvas
    this.shadowRoot.appendChild(this.canvas);

    // Auto Init
    this.initCanvas();
  }

  initCanvas() {
    this.resizeCanvas();
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Event untuk interactive drawing
    this.canvas.addEventListener("mousedown", (e) => this.startDrawing(e));
    this.canvas.addEventListener("mousemove", (e) => this.draw(e));
    this.canvas.addEventListener("mouseup", () => this.stopDrawing());

    // Optimasi rendering
    if (this.optimize) {
      requestAnimationFrame(() => this.renderLoop());
    }
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.ctx.scale(dpr, dpr);
  }

  renderLoop() {
    requestAnimationFrame(() => this.renderLoop());
  }

  // Interactive Drawing
  startDrawing(e) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
  }

  draw(e) {
    if (!this.drawing) return;
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.closePath();
  }

  // API untuk menggambar bentuk
  drawCircle(x, y, radius, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawRectangle(x, y, width, height, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawText(text, x, y, fontSize = 16, color = "black") {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText(text, x, y);
  }
}

customElements.define("kittle-2dcanvas", Kittle2DCanvas);