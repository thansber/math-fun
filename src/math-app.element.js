import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { bgColorStyle } from './shared-styles';
import { generateEquation, getSettings, MAX_NUM_HIGH_SCORES } from './utils';
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
    this.toasts = this.shadowRoot.querySelector('math-toasts');

    this.toasts.toast({
      type: 'info',
      message:
        'Once the game starts, enter your answer and press Space or Enter',
      permanent: true
    });
  }

  gameOver() {
    this.time = 0;
    this.toHighScores();
  }

  isActive(page) {
    return classMap({ active: this.activePage === page });
  }

  isNewHighScore() {
    if (!this.score) {
      // must score more than 0
      return false;
    }

    if (this.settings.highScores.length < MAX_NUM_HIGH_SCORES) {
      // as long as there aren't enough high scores
      return true;
    }

    // when there are enough high scores, must be more than last one
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

  onToast(detail) {
    this.toasts.toast(detail);
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

      <math-toasts></math-toasts>
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
      this.toasts.toast({
        type: 'info',
        message: 'New high score! Enter your name and click Save'
      });
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
    this.toasts.removeAll();
    this.activePage = COUNTDOWN;
    this.countdown.start();
    this.score = 0;
  }
}

customElements.define('math-app', MathApp);
