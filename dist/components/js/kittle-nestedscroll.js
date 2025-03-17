class KittleNestedScroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-height: var(--max-height, auto);
          min-height: 100vh;
          overflow: hidden;
          border-radius: var(--rounded, 8px);
          box-shadow: var(--shadow, 0px 4px 10px rgba(0, 0, 0, 0.1));
          background: var(--bg-color, white);
          position: relative;
        }

        .scroll-container {
          width: 100%;
          overflow-y: auto;
          scroll-behavior: smooth;
          padding: var(--padding, 10px);
          will-change: transform;
        }

        .bounce {
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
      </style>

      <div class="scroll-container">
        <slot></slot>
      </div>
    `;
    
    this.scrollContainer = this.shadowRoot.querySelector(".scroll-container");
    this.bounceStrength = parseInt(this.getAttribute("bounce-strength")) || 20;
    this.startY = 0;
    this.isAtTop = false;
    this.isAtBottom = false;
  }
  
  connectedCallback() {
    this.scrollContainer.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: true });
    this.scrollContainer.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: false });
    this.scrollContainer.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.scrollContainer.addEventListener("wheel", this.handleMouseWheel.bind(this), { passive: false });
  }
  
  handleTouchStart(event) {
    this.startY = event.touches[0].clientY;
  }
  
  handleTouchMove(event) {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - this.startY;
    
    if (this.scrollContainer.scrollTop <= 0 && deltaY > 0) {
      this.isAtTop = true;
      event.preventDefault();
      this.scrollContainer.style.transform = `translateY(${Math.min(this.bounceStrength, deltaY)}px)`;
    } else if (
      this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight &&
      deltaY < 0
    ) {
      this.isAtBottom = true;
      event.preventDefault();
      this.scrollContainer.style.transform = `translateY(${Math.max(-this.bounceStrength, deltaY)}px)`;
    }
  }
  
  handleTouchEnd() {
    if (this.isAtTop || this.isAtBottom) {
      this.scrollContainer.classList.add("bounce");
      this.scrollContainer.style.transform = "translateY(0)";
      setTimeout(() => this.scrollContainer.classList.remove("bounce"), 300);
    }
    this.isAtTop = false;
    this.isAtBottom = false;
  }
  
  handleMouseWheel(event) {
    const { deltaY } = event;
    if (
      (this.scrollContainer.scrollTop <= 0 && deltaY < 0) ||
      (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight &&
        deltaY > 0)
    ) {
      event.preventDefault();
    }
  }
}

customElements.define("kittle-nestedscroll", KittleNestedScroll);