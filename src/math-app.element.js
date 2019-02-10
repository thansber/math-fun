import { html, LitElement, css } from "lit-element";
import "./math-menu.element";

class MathApp extends LitElement {
  static get styles() {
    return [
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
      <math-menu></math-menu>
    `;
  }
}

customElements.define("math-app", MathApp);
