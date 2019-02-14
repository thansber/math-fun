import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';

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

        #scores {
          width: 50%;
        }

        .row {
          display: flex;
          justify-content: space-between;
        }
      `
    ];
  }

  static get properties() {
    return {
      scores: { type: Object }
    };
  }

  render() {
    return html`
      <section id="scores">
        <h1>High Scores</h1>
        ${this.scores.map(
          score =>
            html`
              <div class="row">
                <div class="name">${score.name}</div>
                <div class="score">${score.score}</div>
              </div>
            `
        )}
      </section>
    `;
  }
}

customElements.define('math-high-score', MathHighScore);
