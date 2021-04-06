import { html } from "lit-element";
import Component from "../base/component";

class MockComponent extends Component {
  static get tagName() {
    return "mock-component";
  }

  static get properties(){
    return {
      counter: String
    }
  }

  constructor() {
    super();

    this.counter = 0;
  }

  _increaseCounter() {
    this.counter += 1;
  }

  _decreaseCounter() {
    this.counter -= 1;
  }

  render() {
    return html`<div class="mock-component">
      <p>${this.counter}</p>
      <button @click=${this._increaseCounter}>Increase</button>
      <button @click=${this._decreaseCounter}>Decrease</button>
    </div>`;
  }
}

window.customElements.define("mock-component", MockComponent)
