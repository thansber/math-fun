import { LitElement, html, css } from 'lit-element';

class MathTimer extends LitElement {
  constructor() {
    super();
    this.paused = false;
  }

  static get styles() {
    return [
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {
      time: { type: Number }
    };
  }

  pause() {
    this.paused = !this.paused;
  }

  render() {
    return html`
      ${this.time} seconds left
    `;
  }

  start() {
    this.timer = setInterval(() => {
      if (!this.paused) {
        this.time--;
      }
      if (this.time === 0) {
        this.dispatchEvent(
          new CustomEvent('time-up', {
            bubbles: true,
            composed: true
          })
        );
        this.stop();
      }
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

customElements.define('math-timer', MathTimer);
