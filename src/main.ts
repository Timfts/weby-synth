import AppShell from "./components/AppShell";
// @ts-ignore
import init from "./assembly/build/optimized.wasm";

init().then((exports: any) => {
  const { add, times } = exports;
  /* console.log(add(2, 5));
  console.log(times(2,3)) */
});

window.customElements.define(AppShell.tagName, AppShell);
