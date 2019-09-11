class Modal extends HTMLElement {
  // Element is created
  constructor() {
    super();

    // Attach open shadow DOM
    this.attachShadow({ mode: "open" });

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
          <h1>Please Confirm</h1>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Confirm</button>
        </section>
      </div>
    `;
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
