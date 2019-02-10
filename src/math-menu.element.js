import { LitElement, html, css } from "lit-element";

class MathMenu extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          align-items: center;
          background-color: #444444;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .instructions {
          color: white;
          font-size: 150%;
        }

        button {
          border-radius: 0.5rem;
          font-size: 200%;
          margin-bottom: 1.5rem;
          width: 25%;
        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <p class="instructions">
        Welcome to Fun with Math!
      </p>
      <button id="toStart">Start the Game</button>
      <button id="toSettings">Settings</button>
    `;
  }
}

customElements.define("math-menu", MathMenu);
