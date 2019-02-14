import { LitElement, html, css } from 'lit-element';
import fullPageStyles from '../full-page.styles';

class MathHighScore extends LitElement {
  static get styles() {
    return [
      fullPageStyles,
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      HI SCORES
    `;
  }
}

customElements.define('math-high-score', MathHighScore);
