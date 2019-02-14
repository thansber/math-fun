import { LitElement, html, css } from 'lit-element';

class MathScoreboard extends LitElement {
  constructor() {
    super();
    this.time = 0;
  }

  static get styles() {
    return [
      css`
        :host {
          font-size: 1rem;
          right: 1rem;
          position: absolute;
          top: 1rem;
        }

        .row {
          text-align: right;
        }
      `
    ];
  }

  static get properties() {
    return {
      score: { type: Number },
      time: { type: Number }
    };
  }

  firstUpdated() {
    this.timer = this.shadowRoot.querySelector('math-timer');
  }

  render() {
    return html`
      <div class="row">${this.score} correct</div>
      <math-timer .time="${this.time}"></math-timer>
    `;
  }

  startTimer() {
    this.timer.start();
  }
}

customElements.define('math-scoreboard', MathScoreboard);
