class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log("its working!!!!");
  }
}

customElements.define("v-tooltip", Tooltip);
