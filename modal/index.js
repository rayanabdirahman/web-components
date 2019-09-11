class Modal extends HTMLElement {
  // Element is created
  constructor() {
    super();
    console.log("Hello from Modal!");
  }

  // Element is attached to DOM
  connectedCallback() {
    console.log("attached");
  }

  // Element is removed from DOM
  disconnectedCallback() {
    console.log("disconnected");
  }
}

customElements.define("v-modal", Modal);
