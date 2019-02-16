import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';
import { saveHighScores } from '../utils';

class MathHighScore extends LitElement {
  constructor() {
    super();
    this.scores = [];
  }

  static get styles() {
    return [
      fullPageStyles,
      css`
        :host {
          font-size: 200%;
        }

        h1 {
          text-align: center;
        }

        #scores {
          width: 50%;
        }

        .row {
          display: flex;
          justify-content: space-between;
        }

        #newHighScore {
          font-family: inherit;
          font-size: inherit;
          width: 75%;
        }

        button {
          border: 0;
          border-radius: 0.25rem;
          font-family: inherit;
          font-size: 100%;
          margin-top: 2rem;
          padding: 0.5rem 1rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      isHighScore: { type: Boolean },
      scores: { type: Object }
    };
  }

  enterNewScore(newHighScore) {
    this.scores.push({
      isNew: true,
      score: newHighScore
    });
    this.scores.sort(this.sortByScore);
    this.isHighScore = true;
  }

  render() {
    return html`
      <section id="scores">
        <h1>High Scores</h1>
        ${this.scores.map(
          score =>
            html`
              <div class="row">
                <div class="name">${this.renderScoreName(score)}</div>
                <div class="score">${score.score}</div>
              </div>
            `
        )}
      </section>
      ${this.renderActions()}
    `;
  }

  renderActions() {
    if (this.isHighScore) {
      return html`
        <button id="save" @click="${this.saveHighScore}">Save</button>
      `;
    }
    return html`
      <button id="toMenu" @click="${this.toMenu}">Back to Menu</button>
    `;
  }

  renderScoreName(highScore) {
    if (highScore.isNew) {
      return html`
        <input id="newHighScore" placeholder="Enter your name" />
      `;
    }
    return html`
      ${highScore.name}
    `;
  }

  saveHighScore() {
    const highScoreIndex = this.scores.findIndex(score => score.isNew);
    const highScore = this.scores[highScoreIndex];
    highScore.name = this.shadowRoot.getElementById('newHighScore').value;
    highScore.isNew = false;
    this.scores.splice(highScoreIndex, 1, highScore);
    this.isHighScore = false;
    saveHighScores(this.scores);
  }

  sortByScore(a, b) {
    return b.score - a.score;
  }

  toMenu() {
    this.dispatchEvent(new CustomEvent('to-menu'));
  }

  updated() {
    if (this.isHighScore) {
      this.shadowRoot.getElementById('newHighScore').focus();
    }
  }
}

customElements.define('math-high-score', MathHighScore);
