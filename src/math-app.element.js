import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { generateEquation } from './equations';
import { getSettings } from './settings';
import './math-menu.element';
import './math-countdown.element';
import './math-equation.element';
import './math-scoreboard.element';
import './math-timer.element';

class MathApp extends LitElement {
  constructor() {
    super();
    this.activePage = 'menu';
    this.settings = getSettings();
    this.score = 0;
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
      equation: { type: Object },
      score: { type: Number }
    };
  }

  correctAnswer() {
    this.newEquation();
    this.score++;
    console.log(`answered ${this.score} correctly`);
  }

  firstUpdated() {
    this.countdown = this.shadowRoot.querySelector('math-countdown');
    this.scoreboard = this.shadowRoot.querySelector('math-scoreboard');
  }

  gameOver() {
    debugger;
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
        @countdown-complete="${() => this.startGame()}"
      ></math-countdown>

      <math-equation
        class="${classMap({ active: this.isActive('equations') })}"
        .equation="${this.equation}"
        @correct-answer="${() => this.correctAnswer()}"
      >
        <math-scoreboard
          .score="${this.score}"
          .time="${this.settings.time}"
          @time-up="${() => this.gameOver()}"
        ></math-scoreboard>
      </math-equation>
    `;
  }

  startGame() {
    this.newEquation();
    this.activePage = 'equations';
    this.scoreboard.startTimer();
  }

  toSettings() {
    console.log('toSettings');
  }

  toStart() {
    this.activePage = 'countdown';
    this.countdown.start();
    this.score = 0;
  }
}

customElements.define('math-app', MathApp);
