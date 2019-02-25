import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { bgColorStyle } from './shared-styles';
import { generateEquation, getSettings } from './utils';
import './elements';

const COUNTDOWN = 'countdown';
const EQUATIONS = 'equations';
const HIGH_SCORE = 'high-score';
const MENU = 'menu';
const SETTINGS = 'settings';

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
      settings: { type: Object, attribute: false },
      time: { type: Number, attribute: false }
    };
  }

  bgColor() {
    return styleMap({ backgroundColor: `#${this.settings.bgColor}` });
  }

  correctAnswer() {
    this.newEquation();
    this.score++;
  }

  firstUpdated() {
    this.countdown = this.shadowRoot.querySelector('math-countdown');
    this.equations = this.shadowRoot.querySelector('math-equation');
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
    if (!this.settings.highScores.length) {
      return true;
    }
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
        style="${bgColorStyle(this.settings.bgColor)}"
        @to-start="${() => this.toStart()}"
        @to-settings="${() => this.toSettings()}"
        @to-high-scores="${() => this.toHighScores()}"
      ></math-menu>
      <math-countdown
        class="${this.isActive(COUNTDOWN)}"
        style="${bgColorStyle(this.settings.bgColor)}"
        @countdown-complete="${() => this.startGame()}"
      ></math-countdown>

      <math-equation
        class="${this.isActive(EQUATIONS)}"
        style="${bgColorStyle(this.settings.bgColor)}"
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
        style="${bgColorStyle(this.settings.bgColor)}"
        .scores="${this.settings.highScores}"
        @to-menu="${() => this.toMenu()}"
      ></math-high-score>

      <math-settings
        class="${this.isActive(SETTINGS)}"
        style="${bgColorStyle(this.settings.bgColor)}"
        @saved-settings="${e => this.settingsUpdated()}"
        @to-menu="${() => this.toMenu()}"
      ></math-settings>
    `;
  }

  settingsUpdated() {
    this.settings = getSettings();
    this.toMenu();
  }

  startGame() {
    this.newEquation();
    this.time = this.settings.time;
    this.equations.prep();
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

  toSettings() {
    this.activePage = SETTINGS;
  }

  toStart() {
    this.activePage = COUNTDOWN;
    this.countdown.start();
    this.score = 0;
  }
}

customElements.define('math-app', MathApp);
