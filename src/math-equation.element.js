import { LitElement, html, css } from 'lit-element';
import fullPageStyles from './full-page.styles';

class MathEquation extends LitElement {
  constructor() {
    super();
    this.equation = {};
  }

  static get styles() {
    return [
      fullPageStyles,
      css`
        :host {
          font-size: 800%;
        }

        #result {
          align-self: center;
          font-size: 50%;
          position: absolute;
          top: -6rem;
        }

        #result.show {
          animation-duration: 2s;
          animation-name: flydown;
        }

        @keyframes flydown {
          25% {
            top: 2rem;
          }

          75% {
            top: 2rem;
          }
        }

        section {
          display: flex;
          flex-direction: column;
          width: 20rem;
        }

        #top {
          display: flex;
          align-self: flex-end;
        }

        #bottom {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        #divider {
          border-color: white;
          border-style: solid;
          border-width: 1.5rem 0 0 0;
        }

        #answer {
          border: 0;
          box-sizing: border-box;
          font-family: inherit;
          font-size: 100%;
          margin-top: 2rem;
          text-align: right;
          padding: 0 0.25rem;
          width: 100%;
        }
      `
    ];
  }

  static get properties() {
    return {
      equation: { type: Object }
    };
  }

  checkAnswer(e) {
    this.clearResult();
    if ([13, 32].indexOf(e.keyCode) > -1) {
      const isCorrect = this.isAnswerCorrect(e);
      this.result.textContent = isCorrect ? 'Correct!' : 'Incorrect';
      this.result.classList.add('show');
      e.preventDefault();

      if (isCorrect) {
        this.dispatchEvent(new CustomEvent('correct-answer'));
        this.answer.value = '';
      }
    }
  }

  clearResult() {
    this.result.classList.remove('show');
  }

  firstUpdated() {
    this.result = this.shadowRoot.getElementById('result');
    this.answer = this.shadowRoot.getElementById('answer');
  }

  isAnswerCorrect(e) {
    return +e.target.value === +this.equation.answer;
  }

  render() {
    return html`
      <div id="result" @animationend="${() => this.clearResult()}">
        Correct!
      </div>
      <section>
        <div id="top">
          <span>${this.equation.operand1}</span>
        </div>
        <div id="bottom">
          <span>${this.equation.operator}</span>
          <span>${this.equation.operand2}</span>
        </div>
        <div id="divider"></div>
        <input
          id="answer"
          maxlength="2"
          @keypress="${e => this.checkAnswer(e)}"
        />
      </section>
      <slot></slot>
    `;
  }
}

customElements.define('math-equation', MathEquation);
