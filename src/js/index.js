import MockComponent from "./components/mock";

import init from "../assembly/build/optimized.wasm";

window.customElements.define(MockComponent.tagName, MockComponent);

init().then((exports) => {
  const { add, times } = exports;
  console.log(add(2, 5));
  console.log(times(2,3))
});
