import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';
import buttonStyles from '../button-styles';
import { getSettings, saveSettings, Operators } from '../utils';

class MathSettings extends LitElement {
  constructor() {
    super();
    this.operators = [
      { label: 'Addition', value: Operators.ADD },
      { label: 'Subtraction', value: Operators.SUBTRACT }
    ];
    this.settings = getSettings();
  }

  static get styles() {
    return [
      fullPageStyles,
      buttonStyles,
      css`
        :host {
          font-size: 150%;
        }

        section {
          align-items: center;
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          width: 100%;
        }

        select,
        input {
          font-size: inherit;
        }

        input {
          padding-left: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.75rem;
        }

        #actions {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        #actions > * {
          margin-left: 1rem;
          margin-top: 0;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  isOperatorSelected(operator) {
    return operator === this.settings.equationParams.operator;
  }

  render() {
    return html`
      <section id="operators">
        <label for="operator">What do you want to work on?</label>
        <select id="operator">
          ${this.operators.map(
            op =>
              html`
                <option
                  value="${op.value}"
                  ?selected="${this.isOperatorSelected(op.value)}"
                  >${op.label}</option
                >
              `
          )}
        </select>
      </section>

      <section>
        <label for="min">Lowest possible number (0-99)</label>
        <input
          id="min"
          type="number"
          min="0"
          max="99"
          value="${this.settings.equationParams.min}"
        />
      </section>

      <section>
        <label for="max">Highest possible number (0-99)</label>
        <input
          id="max"
          type="number"
          min="0"
          max="99"
          value="${this.settings.equationParams.max}"
        />
      </section>

      <section>
        <label for="time">How many seconds for each test?</label>
        <input
          id="time"
          type="number"
          min="3"
          max="999"
          value="${this.settings.time}"
        />
      </section>

      <section id="actions">
        <button @click="${this.saveSettings}">Save</button>
        <math-to-menu></math-to-menu>
      </section>
    `;
  }

  saveSettings() {
    const operator = this.shadowRoot.getElementById('operator').value;
    const min = this.shadowRoot.getElementById('min').value;
    const max = this.shadowRoot.getElementById('max').value;
    const time = this.shadowRoot.getElementById('time').value;
    saveSettings(operator, min, max, time);
  }
}

customElements.define('math-settings', MathSettings);
