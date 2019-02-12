import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { generateEquation } from './equations';
import { getSettings } from './settings';
import './math-menu.element';
import './math-countdown.element';
import './math-equation.element';

class MathApp extends LitElement {
  constructor() {
    super();
    this.activePage = 'equations';
    this.settings = getSettings();
    this.newEquation();
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
      activePage: { type: String },
      equation: { type: Object }
    };
  }

  firstUpdated() {
    this.countdown = this.shadowRoot.querySelector('math-countdown');
  }

  isActive(page) {
    return this.activePage === page;
  }

  newEquation() {
    this.equation = generateEquation(
      this.settings.equationParams.min,
      this.settings.equationParams.max,
      this.settings.equationParams.operator
    );
    console.log(this.equation);
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
        @countdown-complete="${() => this.toEquations()}"
      ></math-countdown>
      <math-equation
        class="${classMap({ active: this.isActive('equations') })}"
        .equation="${this.equation}"
      ></math-equation>
    `;
  }

  toEquations() {
    this.newEquation();
    this.activePage = 'equations';
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
