import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { generateEquation, getSettings } from './utils';
import './elements';

const COUNTDOWN = 'countdown';
const EQUATIONS = 'equations';
const HIGH_SCORE = 'high-score';
const MENU = 'menu';

class MathApp extends LitElement {
  constructor() {
    super();
    this.activePage = HIGH_SCORE;
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
    this.activePage = HIGH_SCORE;
  }

  isActive(page) {
    return classMap({ active: this.activePage === page });
  }

  newEquation() {
    this.equation = generateEquation(
      this.settings.equationParams.min,
      this.settings.equationParams.max,
      this.settings.equationParams.operator
    );
  }

  render() {
    return html`
      <math-menu
        class="${this.isActive(MENU)}"
        @to-start="${() => this.toStart()}"
        @to-settings="${() => this.toSettings()}"
      ></math-menu>
      <math-countdown
        class="${this.isActive(COUNTDOWN)}"
        @countdown-complete="${() => this.startGame()}"
      ></math-countdown>

      <math-equation
        class="${this.isActive(EQUATIONS)}"
        .equation="${this.equation}"
        @correct-answer="${() => this.correctAnswer()}"
      >
        <math-scoreboard
          .score="${this.score}"
          .time="${this.settings.time}"
          @time-up="${() => this.gameOver()}"
        ></math-scoreboard>
      </math-equation>

      <math-high-score class="${this.isActive(HIGH_SCORE)}"></math-high-score>
    `;
  }

  startGame() {
    this.newEquation();
    this.activePage = EQUATIONS;
    this.scoreboard.startTimer();
  }

  toSettings() {
    console.log('toSettings');
  }

  toStart() {
    this.activePage = COUNTDOWN;
    this.countdown.start();
    this.score = 0;
  }
}

customElements.define('math-app', MathApp);
