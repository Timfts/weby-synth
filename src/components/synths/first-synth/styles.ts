import { css } from "lit-element";

const styles = css`
  .js-synth {
    background-color: #2c3e50;
    color: #fff;
    padding: 10px;
  }

  .js-synth__config {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .js-synth__notes {
    overflow-x: scroll;
    display: flex;
    background-color: white;
    height: 60px;
    margin-bottom: 20px;
    color: black;
  }

  .js-synth__note {
    width: 40px;
    border: 1px solid black;
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .js-synth__note:hover {
    background-color: orange;
  }
`;

export default styles;
