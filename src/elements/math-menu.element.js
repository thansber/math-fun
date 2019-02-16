import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';

class MathMenu extends LitElement {
  static get styles() {
    return [
      fullPageStyles,
      css`
        .instructions {
          font-size: 150%;
        }

        button {
          border-radius: 0.5rem;
          font-family: inherit;
          font-size: 200%;
          margin-bottom: 1.5rem;
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
