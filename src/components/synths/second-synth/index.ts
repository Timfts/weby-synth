import { html, define, property } from "hybrids";

interface SecondSynthHybrids {
  /** count state */
  count: number;
  test: {a: string, b: number}
}

function updateCounter(host: SecondSynthHybrids) {
  console.log(typeof host, host, Object.keys(host))
  host.test = {a: "sd", b: 2}
  host.count += 1;
}

export default function SecondSynth() {
  return define<SecondSynthHybrids>("second-synth", {
    count: 0,
    test: property({a: "cenuo", b: 2}),
    render: ({ count }) => {
      return html`
        <button onclick="${updateCounter}">Count: ${count}</button>
      `;
    },
  });
}
