import { html, LitElement, query } from "lit-element";
import { Note } from "@rharel/music-note-utils";
import styles from "./styles";


export default class FirstSynth extends LitElement {
  static tagName = "first-synth"
  static styles = styles;
  audioContext: AudioContext;
  mainGainNode: GainNode;
  sineTerms: Float32Array = new Float32Array([0, 0, 1, 0, 1]);
  cosineTerms: Float32Array = new Float32Array(this.sineTerms.length);
  customWaveForm: PeriodicWave;
  currentNote: OscillatorNode | null;

  @query("#wavetable")
  waveTable: any;

  // lifecycle
  constructor() {
    super();
    // contain a list of all currently-playing oscillators. It starts off empty, since there are none playing yet
    this.audioContext = new (AudioContext || window.webkitAudioContext)();
    /* this.oscList = []; */
    this.mainGainNode = this.audioContext.createGain();
    this.customWaveForm = this.audioContext.createPeriodicWave(
      this.cosineTerms,
      this.sineTerms
    );

    this.currentNote = null;

    // variables to create waveforms

    /** will be an array of arrays; each array represents
     * one octave, each of which contains one entry for each note in that octave.
     * The value for each is the frequency, in Hertz, of the note's tone.
     * */
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupGain();
  }

  private _setupGain() {
    this.mainGainNode.connect(this.audioContext.destination);
    this.mainGainNode.gain.value = 0.5;
  }

  private _changeVolume(e: { target: HTMLSelectElement }) {
    const newVolumeValue = e?.target?.value;
    const numberValue = Number(newVolumeValue);
    this.mainGainNode.gain.value = numberValue;
  }

  private _pressNote(e: { target: HTMLSelectElement }) {
    const dataset = e.target.dataset || {};
    const { octave = "", note = "", frequency = "" } = dataset;
    this.currentNote = this.playTone(frequency);
  }

  private _releaseNote() {
    if (!!this.currentNote) {
      this.currentNote.stop();
    }
  }

  playTone(freq: string) {
    const osc = this.audioContext.createOscillator();
    osc.connect(this.mainGainNode);
    const type = this.waveTable.options[this.waveTable.selectedIndex].value;
    const numberFreq = Number(freq);

    if (type == "custom") {
      osc.setPeriodicWave(this.customWaveForm);
    } else {
      osc.type = type;
    }

    osc.frequency.value = numberFreq;
    osc.start();

    return osc;
  }

  private _renderKeys() {
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
      const allOctaveNotes: { name: string; octave: string }[] = notes.map(
        (note) => ({
          name: `${note}${octave}`,
          octave: String(octave),
        })
      );

      return [...acc, ...allOctaveNotes];
    }, []);

    return allNotes.map(
      ({ name, octave }: { name: string; octave: string }) => {
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
      }
    );
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
