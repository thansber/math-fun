import { LitElement, html, css } from 'lit-element';
import buttonStyles from '../button-styles';
import fullPageStyles from '../full-page.styles';

class MathMenu extends LitElement {
  static get styles() {
    return [
      fullPageStyles,
      buttonStyles,
      css`
        .instructions {
          font-size: 150%;
        }

        button {
          font-size: 200%;
          margin-bottom: 1.5rem;
          min-width: 10rem;
          width: 25%;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <p class="instructions">
        Welcome to Fun with Math!
      </p>
      <button id="toStart" @click="${this.toStart}">
        Start the Game
      </button>
      <button id="toHighScores" @click="${this.toHighScores}">
        High Scores
      </button>
      <button id="toSettings" @click="${this.toSettings}">
        Settings
      </button>
    `;
  }

  toHighScores() {
    this.dispatchEvent(new CustomEvent('to-high-scores'));
  }

  toSettings() {
    this.dispatchEvent(new CustomEvent('to-settings'));
  }

  toStart() {
    this.dispatchEvent(new CustomEvent('to-start'));
  }
}

customElements.define('math-menu', MathMenu);
