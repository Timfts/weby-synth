import { html, LitElement } from "lit-element";

export default class JsSynth extends LitElement {
  static get tagName() {
    return "js-synth";
  }

  constructor() {
    super();

    this.waveforms = ["sine"];
  }

  render() {
    return html`
      <style>
        .color {
          color: red;
        }
      </style>
      <div class="js-synth">
        <div class="js-synth__notes">notes</div>
        <div class="js-synth__config">
          <div class="js-synth__left-panel">left</div>
          <div class="js-synth__right-panel">right</div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("js-synth", JsSynth);
