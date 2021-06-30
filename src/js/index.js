import "./components/js-synth"

import init from "../assembly/build/optimized.wasm";



init().then((exports) => {
  const { add, times } = exports;
  /* console.log(add(2, 5));
  console.log(times(2,3)) */
});
