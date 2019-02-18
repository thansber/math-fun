import { css } from 'lit-element';

export default (buttonStyles = css`
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
`);
