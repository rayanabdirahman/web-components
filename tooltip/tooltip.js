class Tooltip extends HTMLElement {
  /**
   * Element has been created
   */
  constructor() {
    super();
    this._tooltipContainer;

    // set default values for element attributes
    this._tooltipText = "Text attribute needs to be set on element";

    // attach shadow DOM
    this.attachShadow({ mode: "open" });

    // append template to shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        :host(.dark) {
          background-color: grey;
        }

        :host-context(p) {
          font-weight: bold;
        }

        :host {
          background-color: pink;
        }


        div {
          font-weight: normal;
          background-color: var(--tooltip-content-background-color, red);
          width: 150px;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10px;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.25);
        }

        ::slotted(.highlight) {
          background-color: orange;
        }

        .icon {
          background-color: var(--tooltip-icon-background-color);
          color: white;
          padding: 5px 10px;
          text-align: center;
          border-radius: 50%;
        }

        .icon:hover {
          cursor: pointer;
        }
      </style>
      <slot></slot>
      <span class="icon">?</span>
    `;
  }

  /**
   * Element is attached to DOM
   * Use for DOM initialisation
   */
  connectedCallback() {
    console.log("Attached");

    // Get Element text attributes
    if (this.hasAttribute("text")) {
      // override default value for text attribute
      this._tooltipText = this.getAttribute("text");
    }

    // creating a span element to show tooltip icon
    const tooltipIcon = this.shadowRoot.querySelector("span");

    // show tooltip on icon hover
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));

    // hide tooltip icon on mouse leave
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
  }

  /**
   * Element is detached from DOM
   * Use for cleanup work
   */
  disconnectedCallback() {
    console.log("REMOVED!!1");
  }

  /**
   * Listens for attribute changes on Elememnt
   * Used to update data or DOM
   */
  attributesChangedCallback() {}

  /**
   * @description Show tooltip container
   * @private
   */
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText; // set tooltip text attribute to tooltipContainer
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  /**
   * @description Hide tooltip container
   * @private
   */
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("v-tooltip", Tooltip);
