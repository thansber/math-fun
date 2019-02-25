import { LitElement, html, css } from 'lit-element';
import { buttonStyles, fullPageStyles } from '../shared-styles';
import { saveHighScores, MAX_NUM_HIGH_SCORES } from '../utils';

class MathHighScore extends LitElement {
  constructor() {
    super();
    this.scores = [];
  }

  static get styles() {
    return [
      fullPageStyles,
      buttonStyles,
      css`
        :host {
          font-size: 200%;
        }

        h1 {
          text-align: center;
        }

        #scores {
          margin-bottom: 2rem;
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
        ${this.scores.slice(0, MAX_NUM_HIGH_SCORES).map(
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
      <math-to-menu></math-to-menu>
    `;
  }

  renderScoreName(highScore) {
    if (highScore.isNew) {
      return html`
        <input id="newHighScore" placeholder="Enter your name" maxlength="20" />
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

  updated() {
    if (this.isHighScore) {
      this.shadowRoot.getElementById('newHighScore').focus();
    }
  }
}

customElements.define('math-high-score', MathHighScore);
