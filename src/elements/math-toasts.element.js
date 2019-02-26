import { LitElement, html, css } from 'lit-element';

class MathToasts extends LitElement {
  constructor() {
    super();
    this.uniqueId = 100;
    this.toasts = [];
  }

  static get styles() {
    return [
      css`
        :host {
          position: fixed;
          bottom: 0.5rem;
          left: 0.5rem;
          z-index: 10;
        }

        .toast {
          align-items: center;
          background-color: white;
          border-radius: 0.25rem;
          display: flex;
          margin-top: 0.5rem;
          min-height: 4rem;
          width: 16rem;
        }

        .message {
          display: block;
          padding: 1rem;
        }

        .close {
          align-self: flex-start;
          cursor: pointer;
          margin-left: 1rem;
          padding: 1rem;
        }
      `
    ];
  }

  static get properties() {
    return {
      toasts: { type: Array }
    };
  }

  remove(e) {
    this.removeToast(+e.target.getAttribute('index'));
  }

  removeAll() {
    this.toasts = [];
  }

  removeByUuid(uuid) {
    const index = this.toasts.findIndex(t => t.uuid === uuid);
    if (index >= 0) {
      this.removeToast(index);
    }
  }

  removeToast(toastIndex) {
    this.toasts = [
      ...this.toasts.slice(0, toastIndex),
      ...this.toasts.slice(toastIndex + 1)
    ];
  }

  render() {
    return html`
      ${this.toasts.map(
        (toast, i) =>
          html`
            <div class="toast">
              <span class="message">${toast.message}</span>
              <div class="close" index="${i}" @click="${e => this.remove(e)}">
                &times;
              </div>
            </div>
          `
      )}
    `;
  }

  toast(newToast) {
    const t = { ...newToast, uuid: this.uuid() };
    this.toasts = [...this.toasts, t];
    if (!t.permanent) {
      setTimeout(() => this.removeByUuid(t.uuid), 3000);
    }
  }

  uuid() {
    // TODO: replace with actual uuid
    return ++this.uniqueId;
  }
}

customElements.define('math-toasts', MathToasts);
