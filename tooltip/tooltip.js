class Tooltip extends HTMLElement {
  /**
   * Element has been created
   */
  constructor() {
    super();

    /**
     * set default values for element attributes
     * @type { string } - Text attribute needs to be set on element
     */
    this._tooltipText = "Text attribute needs to be set on element";

    /**
     * define tooltip icon
     * @type { HTMLSpanElement }
     */
    this._tooltipIcon;

    /**
     * determins tooltip visibility
     * @type { boolean } - false
     */
    this._isTooltipVisible = false;

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
    this._tooltipIcon = this.shadowRoot.querySelector("span");

    // show tooltip on icon hover
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );

    // hide tooltip icon on mouse leave
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
  }

  /**
   * Element is detached from DOM
   * Use for cleanup work
   */
  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  static get observedAttributes() {
    return ["text"];
  }

  /**
   * Listens for attribute changes on Elememnt
   * Used to update data or DOM
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.table(name, oldValue, newValue);
    // check if oldValue is equal to newValue
    if (oldValue === newValue) {
      return;
    }

    // check if name attribute has changed
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._isTooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText; // set tooltip text attribute to tooltipContainer
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  /**
   * @description Show tooltip container
   * @private
   */
  _showTooltip() {
    this._isTooltipVisible = true;
    this._render();
  }

  /**
   * @description Hide tooltip container
   * @private
   */
  _hideTooltip() {
    this._isTooltipVisible = false;
    this._render();
  }
}

customElements.define("v-tooltip", Tooltip);
