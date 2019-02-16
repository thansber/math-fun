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
    this.activePage = MENU;
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
      score: { type: Number },
      time: { type: Number, attribute: false }
    };
  }

  correctAnswer() {
    this.newEquation();
    this.score++;
  }

  firstUpdated() {
    this.countdown = this.shadowRoot.querySelector('math-countdown');
    this.highScores = this.shadowRoot.querySelector('math-high-score');
    this.scoreboard = this.shadowRoot.querySelector('math-scoreboard');
  }

  gameOver() {
    this.time = 0;
    this.toHighScores();
  }

  isActive(page) {
    return classMap({ active: this.activePage === page });
  }

  isNewHighScore() {
    return !!this.settings.highScores.filter(
      highScore => this.score > highScore.score
    ).length;
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
        @to-high-scores="${() => this.toHighScores()}"
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
          .time="${this.time}"
          @time-up="${() => this.gameOver()}"
        ></math-scoreboard>
      </math-equation>

      <math-high-score
        class="${this.isActive(HIGH_SCORE)}"
        .scores="${this.settings.highScores}"
        @to-menu="${() => this.toMenu()}"
      ></math-high-score>
    `;
  }

  startGame() {
    this.newEquation();
    this.time = this.settings.time;
    this.activePage = EQUATIONS;
    this.scoreboard.startTimer();
  }

  toHighScores() {
    this.activePage = HIGH_SCORE;
    if (this.isNewHighScore()) {
      this.highScores.enterNewScore(this.score);
    }
  }

  toMenu() {
    this.activePage = MENU;
  }

  toSettings() {}

  toStart() {
    this.activePage = COUNTDOWN;
    this.countdown.start();
    this.score = 0;
  }
}

customElements.define('math-app', MathApp);
