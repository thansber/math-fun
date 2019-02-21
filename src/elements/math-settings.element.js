import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { bgColorStyle, buttonStyles, fullPageStyles } from '../shared-styles';
import { colors, getSettings, saveSettings, Operators } from '../utils';

class MathSettings extends LitElement {
  constructor() {
    super();
    this.operators = [
      { label: 'Addition', value: Operators.ADD },
      { label: 'Subtraction', value: Operators.SUBTRACT }
    ];
    this.settings = getSettings();
    this.selectedBgColor = this.settings.bgColor;
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

        #swatches {
          display: flex;
        }

        .swatch {
          border: 1px solid #777;
          border-radius: 0.125rem;
          cursor: pointer;
          height: 2rem;
          margin: 0 0.5rem 0.5rem 0;
          width: 2rem;
        }

        .swatch:hover {
          border-color: white;
        }

        .swatch.selected {
          box-shadow: 0 0 0.5rem 0.25rem rgba(255, 255, 255, 0.3);
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
    return {
      selectedBgColor: { type: String }
    };
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

      <section>
        <label>What is your favorite color?</label>
        <div id="swatches">
          ${colors.map(
            c =>
              html`
                <div
                  class="${this.swatchClasses(c)}"
                  style="${bgColorStyle(c)}"
                  @click="${() => this.selectColor(c)}"
                ></div>
              `
          )}
        </div>
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
    const savedSettings = saveSettings(
      operator,
      min,
      max,
      time,
      this.selectedBgColor
    );
    this.dispatchEvent(
      new CustomEvent('saved-settings', {
        detail: savedSettings
      })
    );
  }

  selectColor(color) {
    this.selectedBgColor = color;
  }

  swatchClasses(c) {
    return classMap({
      swatch: true,
      selected: c === this.selectedBgColor
    });
  }
}

customElements.define('math-settings', MathSettings);
