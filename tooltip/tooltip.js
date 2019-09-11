class Tooltip extends HTMLElement {
  /**
   * Element has been created
   */
  constructor() {
    super();
    this._tooltipContainer;
  }

  /**
   * Element is attached to DOM
   * Use for DOM initialisation
   */
  connectedCallback() {
    console.log("Attached");
    // creating a span element to show tooltip icon
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";

    // show tooltip on icon hover
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));

    // hide tooltip icon on mouse leave
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
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
    this._tooltipContainer.textContent = "This is the tooltip text!!!";
    this.appendChild(this._tooltipContainer);
  }

  /**
   * @description Hide tooltip container
   * @private
   */
  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("v-tooltip", Tooltip);
