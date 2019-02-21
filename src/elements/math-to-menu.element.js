import { LitElement, html, css } from 'lit-element';
import { buttonStyles } from '../shared-styles';

class MathToMenu extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        :host {
          display: block;
          margin-top: 2rem;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <button id="toMenu" @click="${this.toMenu}">Back to Menu</button>
    `;
  }

  toMenu() {
    this.dispatchEvent(
      new CustomEvent('to-menu', {
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define('math-to-menu', MathToMenu);
