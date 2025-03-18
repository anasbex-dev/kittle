class KittleText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
  }
  
  static get observedAttributes() {
    return [
      'type', 'color', 'bg-color', 'f-sz', 'fonts-family', 'rounded',
      'mg', 'pd', 'content-position', 'display', 'blur', 'shadow', 'opacity',
      'l-h', 'w-s', 'l-s', 'max-w'
    ];
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  render() {
    const type = this.getAttribute('type') || 'p';
    const color = this.getAttribute('color') || '#333';
    const bgColor = this.getAttribute('bg-color') || 'transparent';
    const fontSize = this.getAttribute('f-sz') || '16px';
    const fontFamily = this.getAttribute('fonts-family') || 'Arial, sans-serif';
    const rounded = this.getAttribute('rounded') || '0px';
    const margin = this.getAttribute('mg') || '0px';
    const padding = this.getAttribute('pd') || '5px';
    const contentPosition = this.getAttribute('content-position') || 'left';
    const display = this.getAttribute('display') || 'inline-block';
    const blur = this.getAttribute('blur') || '0px';
    const shadow = this.getAttribute('shadow') || 'none';
    const opacity = this.getAttribute('opacity') || '1';
    
    // Atribut tambahan untuk teks
    const lineHeight = this.getAttribute('l-h') || 'normal';
    const wordSpacing = this.getAttribute('w-s') || 'normal';
    const letterSpacing = this.getAttribute('l-s') || 'normal';
    const maxWidth = this.getAttribute('max-w') || '100%';
    
    // Buat elemen teks
    const textWrapper = document.createElement(type);
    textWrapper.style.color = color;
    textWrapper.style.backgroundColor = bgColor;
    textWrapper.style.fontSize = fontSize;
    textWrapper.style.fontFamily = fontFamily;
    textWrapper.style.borderRadius = rounded;
    textWrapper.style.margin = margin;
    textWrapper.style.padding = padding;
    textWrapper.style.textAlign = contentPosition;
    textWrapper.style.display = display;
    textWrapper.style.filter = `blur(${blur})`;
    textWrapper.style.textShadow = shadow;
    textWrapper.style.opacity = opacity;
    textWrapper.style.lineHeight = lineHeight;
    textWrapper.style.wordSpacing = wordSpacing;
    textWrapper.style.letterSpacing = letterSpacing;
    textWrapper.style.maxWidth = maxWidth;
    textWrapper.style.overflowWrap = 'break-word'; // Agar tidak keluar dari parent
    
    // Set text content dengan innerHTML agar mendukung tag dalam teks
    textWrapper.innerHTML = this.innerHTML;
    
    // Bersihkan shadow DOM dan tambahkan teks baru
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(textWrapper);
  }
}

customElements.define('kittle-text', KittleText);