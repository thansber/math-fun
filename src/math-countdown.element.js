import { LitElement, html, css } from 'lit-element';
import fullPageStyles from './full-page.styles';

class MathCountdown extends LitElement {
  constructor() {
    super();
    this.time = 3;
  }

  static get styles() {
    return [
      fullPageStyles,
      css`
        .time {
          opacity: 0;
          position: absolute;
        }

        .zoom {
          animation-duration: 1s;
          animation-name: zoomin;
        }

        @keyframes zoomin {
          from {
            font-size: 100px;
          }

          25% {
            font-size: 400px;
            opacity: 1;
          }

          75% {
            opacity: 0;
          }
        }
      `
    ];
  }

  countdownComplete() {
    this.dispatchEvent(new CustomEvent('countdown-complete'));
  }

  firstUpdated() {
    this.times = this.shadowRoot.querySelectorAll('.time');
  }

  render() {
    return html`
      <div class="time">3</div>
      <div class="time">2</div>
      <div class="time">1</div>
      <div class="time last" @animationend="${() => this.countdownComplete()}">
        GO
      </div>
    `;
  }

  start() {
    this.times.forEach((time, i) => {
      setTimeout(() => time.classList.add('zoom'), 1000 * i);
    });
  }
}

customElements.define('math-countdown', MathCountdown);