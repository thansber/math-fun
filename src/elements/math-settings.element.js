import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';

class MathSettings extends LitElement {
  static get styles() {
    return [
      fullPageStyles,
      css`
        :host {
          font-size: 150%;
        }

        section {
          margin-bottom: 2rem;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <section id="operator">
        What do you want to work on?
      </section>

      <section id="range">
        <div class="num">Lowest possible number</div>
        <div class="num">Highest possible number</div>
      </section>

      <math-to-menu></math-to-menu>
    `;
  }
}

customElements.define('math-settings', MathSettings);
