class KittleP extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    --font-size: var(--f-sz, 16px);
                    --color: var(--color, #000);
                    --bg-color: var(--bg-color, transparent);
                    --rounded: var(--rounded, 0px);
                    --padding: var(--pd, 0);
                    --margin: var(--mg, 0);
                    --content-position: var(--content-position, left);
                    --display: var(--display, block);
                }

                p {
                    font-size: var(--font-size);
                    color: var(--color);
                    background-color: var(--bg-color);
                    border-radius: var(--rounded);
                    padding: var(--padding);
                    margin: var(--margin);
                    text-align: var(--content-position);
                    display: var(--display);
                    transition: all 0.3s ease;
                }

                /* Custom styles for quote type */
                p[quotes] {
                    font-style: italic;
                    border-left: 4px solid var(--color, #000);
                    padding-left: 12px;
                }
            </style>
            <p>
                <slot></slot>
            </p>
        `;

        this.pElement = this.shadowRoot.querySelector("p");
    }

    static get observedAttributes() {
        return ["f-sz", "color", "rounded", "bg-color", "pd", "mg", "content-position", "display", "type"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type" && newValue === "quotes") {
            this.pElement.setAttribute("quotes", "");
        } else if (name === "type") {
            this.pElement.removeAttribute("quotes");
        } else {
            this.pElement.style.setProperty(`--${name}`, newValue);
        }
    }
}

customElements.define("kittle-p", KittleP);