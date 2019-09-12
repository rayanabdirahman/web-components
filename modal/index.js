class Modal extends HTMLElement {
  // Element is created
  constructor() {
    super();

    // Attach open shadow DOM
    this.attachShadow({ mode: "open" });

    /**
     * check if modal is opened
     * @type { boolean } isOpened - false by default
     */
    this.isOpened = false;

    // Set HTML markup
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(0,0,0,0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 999;
          background-color: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
        }

        :host([opened])  #backdrop,
        :host([opened])  #modal {
          opacity: 1;
          pointer-events: all;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
          color: red;
        }

        header {
          border-bottom: 1px solid #ccc;
        }

        header h1 {
          font-size: 1.25rem;
        }

        header,
        #main {
          padding: 1rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }

        
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title">Please confirm payments</slot>
        </header>
        <section id="main">
          <slot name="content"></slot>
        </section>
        <section id="actions">
          <button id="cancelBtn">Cancel</button>
          <button id="confirmBtn">Confirm</button>
        </section>
      </div>
    `;

    // Add event listener to slots
    const slots = this.shadowRoot.querySelectorAll("slot");
    const confirmBtn = this.shadowRoot.querySelector("#confirmBtn");
    const cancelBtn = this.shadowRoot.querySelector("#cancelBtn");

    slots[1].addEventListener("slotchange", event => {
      console.table(slots[1]);
    });

    cancelBtn.addEventListener("click", this._cancel.bind(this));
    confirmBtn.addEventListener("click", this._confirm.bind(this));
  }

  // Element is attached to DOM
  connectedCallback() {
    console.log("attached");
  }

  // Element is removed from DOM
  disconnectedCallback() {
    console.log("disconnected");
  }

  /**
   * Listens for attribute changes
   * @param { string } name - name of attribute
   * @param { string } oldValue - old value of attribute
   * @param { string } newValue - new value of attribute
   */
  attributesChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpened = true;
    } else {
      this.isOpened = false;
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpened = true;
  }

  hide() {
    this.removeAttribute("opened");
    this.isOpened = false;
  }

  _cancel() {
    this.hide();
  }

  _confirm() {
    this.hide();
  }
}

customElements.define("v-modal", Modal);
