import { html, LitElement, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import './math-menu.element';
import './math-countdown.element';

class MathApp extends LitElement {
  constructor() {
    super();
    this.activePage = 'menu';
  }

  static get styles() {
    return [
      css`
        :host {
        }

        .active {
          z-index: 1;
        }
      `
    ];
  }

  static get properties() {
    return {
      activePage: { type: String }
    };
  }

  firstUpdated() {
    this.countdown = this.shadowRoot.querySelector('math-countdown');
  }

  isActive(page) {
    return this.activePage === page;
  }

  render() {
    return html`
      <math-menu
        class="${classMap({ active: this.isActive('menu') })}"
        @to-start="${() => this.toStart()}"
        @to-settings="${() => this.toSettings()}"
      ></math-menu>
      <math-countdown
        class="${classMap({ active: this.isActive('countdown') })}"
      ></math-countdown>
    `;
  }

  toSettings() {
    console.log('toSettings');
  }

  toStart() {
    this.activePage = 'countdown';
    this.countdown.start();
  }
}

customElements.define('math-app', MathApp);
