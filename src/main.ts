/* import "./components/js-synth" */

// @ts-ignore
import init from "./assembly/build/optimized.wasm";

let a;
const button: HTMLElement = document.querySelector("#lala") as HTMLElement;
button.onclick = async () => {
  const s = await import("./components/synths/first-synth");
  const component = s.default;

  window.customElements.define(component.tagName, component);
};

init().then((exports: any) => {
  const { add, times } = exports;
  /* console.log(add(2, 5));
  console.log(times(2,3)) */
});
