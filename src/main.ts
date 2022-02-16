import AppShell from "./components/AppShell";
// @ts-ignore
import init from "./assembly/build/optimized.wasm";
import FirstSynth from "./components/synths/first-synth"
/* import SecondSynth from "./components/synths/second-synth" */

init().then((exports: any) => {
  const { add, times } = exports;
  /* console.log(add(2, 5));
  console.log(times(2,3)) */
});



window.customElements.define(AppShell.tagName, AppShell);
window.customElements.define(FirstSynth.tagName, FirstSynth);
