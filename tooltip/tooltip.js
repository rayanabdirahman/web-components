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

    // get tooltip template
    const template = document.querySelector("#tooltip-template");

    // append template to shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
