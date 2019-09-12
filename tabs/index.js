class Tabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._isSelected = false;
    this.shadowRoot.innerHTML = `
      <style>
      :host([background]) {
        background-color: red;
        height: 500px;
        width: 600px;
        display: inline-block;
      }

      #panels section{
        display: none;
      }
      </style>
      <div id="tabs">
        <button>Tab 1</button>
        <button>Tab 2</button>
        <button>Tab 3</button>
      </div>
      <div id="panels">
        <section>Content 1</section>
        <section>Content 2</section>
        <section>Content 3</section>
      </div>
    `;
  }

  connectedCallback() {
    const tabsNodeList = this.shadowRoot.querySelectorAll("button");
    const panelsNodeList = this.shadowRoot.querySelectorAll("#panels section");

    this.tabs = Array.from(tabsNodeList);
    this.panels = Array.from(panelsNodeList);

    this.tabs.forEach(el => {
      el.addEventListener("click", this.showPanel.bind(this));
    });

    this._render();
  }

  _render(index) {
    // check if selected
    if (this._isSelected === false) {
      index = 0;
    }

    // check if panel is already displayed
    this.panels.forEach(panel => {
      panel.style.display = "none";
    });

    const panel = this.panels[index];
    panel.style.display = "block";

    // console.log("not select: ", this._isSelected);
    console.log("not select: ", panel);
    // if(this._isSelected)
  }

  showPanel(el) {
    this._isSelected = true;
    const index = this.tabs.indexOf(el.target);
    this._render(index);
  }
}

customElements.define("v-tabs", Tabs);
