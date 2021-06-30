import MarkupController from "../../classes/MarkupController";
import { query } from "lit-element";

class MainApp extends MarkupController {
  static tagName = "main-app";

  @query("#load-synth")
  loadSynthButton: any;

  connectedCallback() {
    super.connectedCallback();
    console.log("app started");

    this._addEvents();
    this._registerGlobalComponents();
  }

  private _addEvents() {
    this.loadSynthButton.onclick = this._onLoadSynth;
  }

  private async _onLoadSynth() {
    const synthModule = await import("../synths/first-synth");
    const SynthComponent = synthModule.default;
    window.customElements.define(SynthComponent.tagName, SynthComponent);
  }

  private _registerGlobalComponents() {
    console.log("registering components");
  }
}

export default MainApp;
