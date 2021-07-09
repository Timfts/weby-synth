import AppShell from "./components/AppShell";
// @ts-ignore
import init from "./assembly/build/optimized.wasm";
import SecondSynth from "./components/synths/second-synth"

init().then((exports: any) => {
  const { add, times } = exports;
  /* console.log(add(2, 5));
  console.log(times(2,3)) */
});

SecondSynth()

window.customElements.define(AppShell.tagName, AppShell);
