import AppShell from "./components/AppShell";
// @ts-ignore
import FirstSynth from "./components/synths/first-synth"
/* import SecondSynth from "./components/synths/second-synth" */



window.customElements.define(AppShell.tagName, AppShell);
window.customElements.define(FirstSynth.tagName, FirstSynth);
