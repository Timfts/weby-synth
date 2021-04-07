import { html, LitElement, css } from "lit-element";
import { Note } from "@rharel/music-note-utils";

export default class JsSynth extends LitElement {
  static get styles() {
    return css`
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
  }

  // lifecycle
  constructor() {
    super();

    // contain a list of all currently-playing oscillators. It starts off empty, since there are none playing yet
    this.audioContext = new (AudioContext || webkitAudioContext)();
    /* this.oscList = []; */
    this.mainGainNode = null;
    this.currentNote = null;

    // variables to create waveforms

    /** will be an array of arrays; each array represents
     * one octave, each of which contains one entry for each note in that octave.
     * The value for each is the frequency, in Hertz, of the note's tone.
     * */
    this.noteFreq = null;
    this.customWaveform = null;
    this.sineTerms = null;
    this.cosineTerms = null;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("vanilla js synth started");
    this._setupGain();
  }

  // Dom refs
  get waveTable() {
    return this.renderRoot.querySelector("#wavetable");
  }

  _setupGain() {
    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.connect(this.audioContext.destination);
    this.mainGainNode.gain.value = "0.5";

    this.sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    this.cosineTerms = new Float32Array(this.sineTerms.length);
    this.customWaveform = this.audioContext.createPeriodicWave(
      this.cosineTerms,
      this.sineTerms
    );
  }

  _changeVolume(e) {
    const newVolumeValue = e.target.value;
    this.mainGainNode.gain.value = newVolumeValue;
  }

  _pressNote(e) {
    const dataset = e.target.dataset || {};
    const { octave = "", note = "", frequency = "" } = dataset;
    this.currentNote = this.playTone(frequency);
  }

  _releaseNote(e) {
    this.currentNote.stop();
  }

  // Methods
  playTone(freq) {
    const osc = this.audioContext.createOscillator();
    osc.connect(this.mainGainNode);
    const type = this.waveTable.options[this.waveTable.selectedIndex].value;

    if (type == "custom") {
      osc.setPeriodicWave(this.customWaveform);
    } else {
      osc.type = type;
    }

    osc.frequency.value = freq;
    osc.start();

    return osc;
  }

  _renderKeys() {
    const octaves = 7;
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];

    const allNotes = [...Array(octaves)].reduce((acc, _, index) => {
      const octave = index + 1;

      const allOctaveNotes = notes.map((note) => ({
        name: `${note}${octave}`,
        octave,
      }));

      return [...acc, ...allOctaveNotes];
    }, []);

    return allNotes.map(({ name, octave }) => {
      const noteFrequency = Note.from_string(name).frequency();

      return html`
        <div
          class="js-synth__note"
          data-octave=${octave}
          data-note=${name}
          data-frequency=${noteFrequency}
          @mousedown=${this._pressNote}
          @mouseup=${this._releaseNote}
        >
          ${name}
        </div>
      `;
    });
  }

  render() {
    return html`
      <div class="js-synth">
        <div class="js-synth__notes">${this._renderKeys()}</div>

        <div class="js-synth__config">
          <div class="js-synth__volume">
            <span>Volume: </span>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.01"
              value=${this.mainGainNode.gain.value}
              list="volumes"
              name="volume"
              @change=${this._changeVolume}
            />
          </div>

          <div class="js-synth__wave">
            <span>Current waveform: </span>
            <select name="waveform" id="wavetable">
              <option value="sine">Sine</option>
              <option value="square" selected>Square</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="triangle">Triangle</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("js-synth", JsSynth);
