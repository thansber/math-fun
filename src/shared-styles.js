import { css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export const fullPageStyles = css`
  :host {
    align-items: center;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color 1s;
  }
`;

export const buttonStyles = css`
  button {
    border: 0;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
    padding: 0.5rem 1rem;
  }

  button:hover {
    box-shadow: 0 0 0.5rem 0.25rem rgba(255, 255, 255, 0.3);
  }
`;

export const bgColorStyle = color => styleMap({ backgroundColor: `#${color}` });
